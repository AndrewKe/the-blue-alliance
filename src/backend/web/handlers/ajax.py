import datetime

from flask import abort, jsonify, make_response, Response
from google.appengine.ext import ndb
from pyre_extensions import none_throws

from backend.common.auth import current_user
from backend.common.consts.model_type import ModelType
from backend.common.consts.playoff_type import TYPE_NAMES as PLAYOFF_TYPE_NAMES
from backend.common.decorators import cached_public
from backend.common.models.api_auth_access import ApiAuthAccess
from backend.common.models.favorite import Favorite
from backend.common.models.typeahead_entry import TypeaheadEntry
from backend.web.decorators import enforce_login


@cached_public
def typeahead_handler(search_key: str) -> Response:
    entry = TypeaheadEntry.get_by_id(search_key)
    if entry is None:
        return jsonify([])

    response = make_response(entry.data_json)
    response.content_type = 'application/json; charset="utf-8"'
    response.last_modified = entry.updated
    return response


def account_apiwrite_events_handler() -> Response:
    """
    Get the events the current user is allowed to edit via the trusted API.
    """
    user = current_user()

    if not user:
        return jsonify([])

    now = datetime.datetime.now()
    auth_tokens = ApiAuthAccess.query(
        ApiAuthAccess.owner == user.account_key,
        ndb.OR(ApiAuthAccess.expiration == None, ApiAuthAccess.expiration >= now),
    ).fetch()

    event_keys = []
    for token in auth_tokens:
        event_keys.extend(token.event_list)

    events = ndb.get_multi(event_keys)
    details = []
    for event in events:
        details.append(
            {"value": event.key_name, "label": "{} {}".format(event.year, event.name)}
        )

    return jsonify(details)


@cached_public
def playoff_types_handler() -> Response:
    """
    Returns the possible playoff types, formatted for EventWizard dropdown
    """
    types = []
    for type_enum, type_name in PLAYOFF_TYPE_NAMES.items():
        types.append({"value": type_enum, "label": type_name})
    return jsonify(types)


@enforce_login
def account_favorites_handler(model_type: int) -> Response:
    user = none_throws(current_user())
    if model_type not in set(ModelType):
        abort(400, f"Unknown model type {model_type}")

    favorites = Favorite.query(
        Favorite.model_type == model_type, ancestor=user.account_key
    ).fetch()
    return jsonify([m.to_json() for m in favorites])
