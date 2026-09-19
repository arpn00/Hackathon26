"""Smoke test: verify Azure OpenAI connectivity and run the flagship case end-to-end.

Run from the backend/ folder with the venv active:  python scripts/smoke.py
Never prints secrets.
"""

from __future__ import annotations

from langgraph.types import Command

from app.agent import build_runtime
from app.config import get_settings
from app.graph.state import initial_state
from app.llm import build_chat_model

FLAGSHIP = "8809074412559830"


def main() -> None:
    settings = get_settings()
    settings.require_azure_openai()
    print(f"[1/3] Config OK  endpoint={settings.azure_openai_endpoint} "
          f"deployment={settings.azure_openai_deployment} mode={settings.zebraai_mode}")

    llm = build_chat_model(settings)
    ping = llm.invoke("Reply with the single word: OK")
    print(f"[2/3] Azure OpenAI reachable  model_said={ping.content!r}")

    runtime = build_runtime(settings)
    config = {"configurable": {"thread_id": "smoke-1"}}
    paused = runtime.graph.invoke(initial_state(FLAGSHIP), config)
    interrupt = paused["__interrupt__"][0].value
    draft = interrupt["draft"] or {}
    print(f"[3/3] Agent ran flagship case "
          f"route={interrupt['route']} confidence={interrupt['confidence']}")
    print("      reply:", (draft.get("reply") or "")[:200])
    print("      citations:", draft.get("citations"))

    final = runtime.graph.invoke(Command(resume={"decision": "approve"}), config)
    print("      final_reply set:", bool(final.get("final_reply")))
    print("SMOKE TEST PASSED")


if __name__ == "__main__":
    main()
