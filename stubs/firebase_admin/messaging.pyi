from typing import Any, Optional

AndroidConfig: Any
AndroidFCMOptions: Any
AndroidNotification: Any
APNSConfig: Any
APNSFCMOptions: Any
APNSPayload: Any
Aps: Any
ApsAlert: Any
CriticalSound: Any
FCMOptions: Any
LightSettings: Any
Message: Any
MulticastMessage: Any
Notification: Any
WebpushConfig: Any
WebpushFCMOptions: Any
WebpushNotification: Any
WebpushNotificationAction: Any
QuotaExceededError: Any
SenderIdMismatchError: Any
ThirdPartyAuthError: Any
UnregisteredError: Any

def send(message: Any, dry_run: bool = ..., app: Optional[Any] = ...): ...
def send_all(messages: Any, dry_run: bool = ..., app: Optional[Any] = ...): ...
def send_multicast(multicast_message: Any, dry_run: bool = ..., app: Optional[Any] = ...): ...
def subscribe_to_topic(tokens: Any, topic: Any, app: Optional[Any] = ...): ...
def unsubscribe_from_topic(tokens: Any, topic: Any, app: Optional[Any] = ...): ...

class ErrorInfo:
    def __init__(self, index: Any, reason: Any) -> None: ...
    @property
    def index(self): ...
    @property
    def reason(self): ...

class TopicManagementResponse:
    def __init__(self, resp: Any) -> None: ...
    @property
    def success_count(self): ...
    @property
    def failure_count(self): ...
    @property
    def errors(self): ...

class BatchResponse:
    def __init__(self, responses: Any) -> None: ...
    @property
    def responses(self): ...
    @property
    def success_count(self): ...
    @property
    def failure_count(self): ...

class SendResponse:
    def __init__(self, resp: Any, exception: Any) -> None: ...
    @property
    def message_id(self): ...
    @property
    def success(self): ...
    @property
    def exception(self): ...

class _MessagingService:
    FCM_URL: str = ...
    FCM_BATCH_URL: str = ...
    IID_URL: str = ...
    IID_HEADERS: Any = ...
    JSON_ENCODER: Any = ...
    FCM_ERROR_TYPES: Any = ...
    def __init__(self, app: Any) -> None: ...
    @classmethod
    def encode_message(cls, message: Any): ...
    def send(self, message: Any, dry_run: bool = ...): ...
    def send_all(self, messages: Any, dry_run: bool = ...): ...
    def make_topic_management_request(self, tokens: Any, topic: Any, operation: Any): ...