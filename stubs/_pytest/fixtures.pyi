import py
from _pytest import nodes as nodes
from _pytest._code.code import FormattedExcinfo as FormattedExcinfo, TerminalRepr as TerminalRepr
from _pytest._code.source import getfslineno as getfslineno
from _pytest._io import TerminalWriter as TerminalWriter
from _pytest.compat import NOTSET as NOTSET, TYPE_CHECKING as TYPE_CHECKING, get_real_func as get_real_func, get_real_method as get_real_method, getfuncargnames as getfuncargnames, getimfunc as getimfunc, getlocation as getlocation, is_generator as is_generator, safe_getattr as safe_getattr
from _pytest.deprecated import FIXTURE_POSITIONAL_ARGUMENTS as FIXTURE_POSITIONAL_ARGUMENTS, FUNCARGNAMES as FUNCARGNAMES
from _pytest.main import Session as Session
from _pytest.mark import ParameterSet as ParameterSet
from _pytest.outcomes import TEST_OUTCOME as TEST_OUTCOME, fail as fail
from typing import Any, Dict, Optional, Tuple, Type

class PseudoFixtureDef:
    cached_result: Any = ...
    scope: Any = ...
    def __init__(self, cached_result: Any, scope: Any) -> None: ...
    def __ne__(self, other: Any) -> Any: ...
    def __eq__(self, other: Any) -> Any: ...
    def __lt__(self, other: Any) -> Any: ...
    def __le__(self, other: Any) -> Any: ...
    def __gt__(self, other: Any) -> Any: ...
    def __ge__(self, other: Any) -> Any: ...

def pytest_sessionstart(session: Session) -> Any: ...

scopename2class: Dict[str, Type[nodes.Node]]
scope2props: Dict[str, Tuple[str, ...]]

def scopeproperty(name: Optional[Any] = ..., doc: Optional[Any] = ...): ...
def get_scope_package(node: Any, fixturedef: Any): ...
def get_scope_node(node: Any, scope: Any): ...
def add_funcarg_pseudo_fixture_def(collector: Any, metafunc: Any, fixturemanager: Any) -> None: ...
def getfixturemarker(obj: Any): ...
def get_parametrized_fixture_keys(item: Any, scopenum: Any) -> None: ...
def reorder_items(items: Any): ...
def fix_cache_order(item: Any, argkeys_cache: Any, items_by_argkey: Any) -> None: ...
def reorder_items_atscope(items: Any, argkeys_cache: Any, items_by_argkey: Any, scopenum: Any): ...
def fillfixtures(function: Any) -> None: ...
def get_direct_param_fixture_func(request: Any): ...

class FuncFixtureInfo:
    argnames: Any = ...
    initialnames: Any = ...
    names_closure: Any = ...
    name2fixturedefs: Any = ...
    def prune_dependency_tree(self) -> None: ...
    def __init__(self, argnames: Any, initialnames: Any, names_closure: Any, name2fixturedefs: Any) -> None: ...
    def __ne__(self, other: Any) -> Any: ...
    def __eq__(self, other: Any) -> Any: ...
    def __lt__(self, other: Any) -> Any: ...
    def __le__(self, other: Any) -> Any: ...
    def __gt__(self, other: Any) -> Any: ...
    def __ge__(self, other: Any) -> Any: ...

class FixtureRequest:
    fixturename: Any = ...
    scope: str = ...
    def __init__(self, pyfuncitem: Any) -> None: ...
    @property
    def fixturenames(self): ...
    @property
    def funcargnames(self): ...
    @property
    def node(self): ...
    @property
    def config(self): ...
    def function(self): ...
    def cls(self): ...
    @property
    def instance(self): ...
    def module(self): ...
    def fspath(self) -> py.path.local: ...
    @property
    def keywords(self): ...
    @property
    def session(self): ...
    def addfinalizer(self, finalizer: Any) -> None: ...
    def applymarker(self, marker: Any) -> None: ...
    def raiseerror(self, msg: Any) -> None: ...
    def getfixturevalue(self, argname: Any): ...

class SubRequest(FixtureRequest):
    fixturename: Any = ...
    param: Any = ...
    param_index: Any = ...
    scope: Any = ...
    def __init__(self, request: Any, scope: Any, param: Any, param_index: Any, fixturedef: Any) -> None: ...
    def addfinalizer(self, finalizer: Any) -> None: ...

scopes: Any
scopenum_function: Any

def scopemismatch(currentscope: Any, newscope: Any): ...
def scope2index(scope: Any, descr: Any, where: Optional[Any] = ...): ...

class FixtureLookupError(LookupError):
    argname: Any = ...
    request: Any = ...
    fixturestack: Any = ...
    msg: Any = ...
    def __init__(self, argname: Any, request: Any, msg: Optional[Any] = ...) -> None: ...
    def formatrepr(self) -> FixtureLookupErrorRepr: ...

class FixtureLookupErrorRepr(TerminalRepr):
    tblines: Any = ...
    errorstring: Any = ...
    filename: Any = ...
    firstlineno: Any = ...
    argname: Any = ...
    def __init__(self, filename: Any, firstlineno: Any, tblines: Any, errorstring: Any, argname: Any) -> None: ...
    def toterminal(self, tw: TerminalWriter) -> None: ...

def fail_fixturefunc(fixturefunc: Any, msg: Any) -> None: ...
def call_fixture_func(fixturefunc: Any, request: Any, kwargs: Any): ...

class FixtureDef:
    baseid: Any = ...
    has_location: Any = ...
    func: Any = ...
    argname: Any = ...
    scope: Any = ...
    scopenum: Any = ...
    params: Any = ...
    argnames: Any = ...
    unittest: Any = ...
    ids: Any = ...
    cached_result: Any = ...
    def __init__(self, fixturemanager: Any, baseid: Any, argname: Any, func: Any, scope: Any, params: Any, unittest: bool = ..., ids: Optional[Any] = ...) -> None: ...
    def addfinalizer(self, finalizer: Any) -> None: ...
    def finish(self, request: Any) -> None: ...
    def execute(self, request: Any): ...
    def cache_key(self, request: Any): ...

def resolve_fixture_function(fixturedef: Any, request: Any): ...
def pytest_fixture_setup(fixturedef: Any, request: Any): ...
def wrap_function_to_error_out_if_called_directly(function: Any, fixture_marker: Any): ...

class FixtureFunctionMarker:
    scope: Any = ...
    params: Any = ...
    autouse: Any = ...
    ids: Any = ...
    name: Any = ...
    def __call__(self, function: Any): ...
    def __init__(self, scope: Any, params: Any, autouse: Any, ids: Any, name: Any) -> None: ...
    def __ne__(self, other: Any) -> Any: ...
    def __eq__(self, other: Any) -> Any: ...
    def __lt__(self, other: Any) -> Any: ...
    def __le__(self, other: Any) -> Any: ...
    def __gt__(self, other: Any) -> Any: ...
    def __ge__(self, other: Any) -> Any: ...

FIXTURE_ARGS_ORDER: Any

def fixture(callable_or_scope: Optional[Any] = ..., *args: Any, scope: str = ..., params: Optional[Any] = ..., autouse: bool = ..., ids: Optional[Any] = ..., name: Optional[Any] = ...): ...
def yield_fixture(callable_or_scope: Optional[Any] = ..., *args: Any, scope: str = ..., params: Optional[Any] = ..., autouse: bool = ..., ids: Optional[Any] = ..., name: Optional[Any] = ...): ...

defaultfuncargprefixmarker: Any

def pytestconfig(request: Any): ...
def pytest_addoption(parser: Any) -> None: ...

class FixtureManager:
    FixtureLookupError: Any = ...
    FixtureLookupErrorRepr: Any = ...
    session: Any = ...
    config: Any = ...
    def __init__(self, session: Any) -> None: ...
    def getfixtureinfo(self, node: Any, func: Any, cls: Any, funcargs: bool = ...): ...
    def pytest_plugin_registered(self, plugin: Any) -> None: ...
    def getfixtureclosure(self, fixturenames: Any, parentnode: Any, ignore_args: Any = ...): ...
    def pytest_generate_tests(self, metafunc: Any) -> None: ...
    def pytest_collection_modifyitems(self, items: Any) -> None: ...
    def parsefactories(self, node_or_obj: Any, nodeid: Any = ..., unittest: bool = ...) -> None: ...
    def getfixturedefs(self, argname: Any, nodeid: Any): ...
