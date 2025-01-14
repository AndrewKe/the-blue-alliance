import collections
import threading
from typing import Any

class RequestEnvironment(threading.local):
    def __init__(self) -> None: ...
    errors: Any
    environ: Any
    runtime_stats: Any
    def Reset(self) -> None: ...
    def Init(self, errors, environ, runtime_stats: Any | None = ...) -> None: ...
    def CloneRequestEnvironment(self): ...
    def Clear(self) -> None: ...
    def IncrementStat(self, metric, code) -> None: ...

class RequestLocalStream:
    def __init__(self, request) -> None: ...
    def close(self) -> None: ...
    def flush(self) -> None: ...
    def write(self, data) -> None: ...
    def writelines(self, data) -> None: ...
    def isatty(self): ...

class RequestLocalEnviron(collections.abc.MutableMapping):
    def __init__(self, request) -> None: ...
    def __len__(self): ...
    def __iter__(self): ...
    def __getitem__(self, key): ...
    def __setitem__(self, key, value) -> None: ...
    def __delitem__(self, key) -> None: ...
    def has_key(self, key): ...
    def copy(self): ...
    def viewitems(self): ...
    def viewkeys(self): ...
    def viewvalues(self): ...

current_request: Any

def PatchOsEnviron(os_module=...) -> None: ...
