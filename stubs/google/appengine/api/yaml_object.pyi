from google.appengine.api import validation as validation, yaml_builder as yaml_builder, yaml_errors as yaml_errors, yaml_listener as yaml_listener
from typing import Any

class _ObjectMapper:
    value: Any
    seen: Any
    def __init__(self) -> None: ...
    def set_value(self, value) -> None: ...
    def see(self, key) -> None: ...

class _ObjectSequencer:
    value: Any
    constructor: Any
    def __init__(self) -> None: ...
    def set_constructor(self, constructor) -> None: ...

class ObjectBuilder(yaml_builder.Builder):
    default_class: Any
    def __init__(self, default_class) -> None: ...
    def BuildDocument(self): ...
    def BuildMapping(self, top_value): ...
    def EndMapping(self, top_value, mapping) -> None: ...
    def BuildSequence(self, top_value): ...
    def MapTo(self, subject, key, value) -> None: ...
    def AppendTo(self, subject, value) -> None: ...

def BuildObjects(default_class, stream, loader=...): ...
def BuildSingleObject(default_class, stream, loader=...): ...