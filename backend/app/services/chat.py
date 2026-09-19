"""Grounded Q&A over the evidence gathered for a case.

One unified assistant the engineer can talk to on top of precedents, knowledge articles,
the related incident, and the proposed draft — answering only from that evidence.
"""

from __future__ import annotations

import json
from typing import Any

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

SYSTEM_PROMPT = (
    "You are Precedent AI's case assistant for a Microsoft customer-support engineer. "
    "Answer ONLY from the evidence provided for this case (similar prior cases, knowledge "
    "articles, the related incident, and any proposed draft reply). "
    "If the evidence does not cover the question, say so plainly and suggest what to gather "
    "next — do not invent facts, case numbers, or links. Cite case or KB identifiers when "
    "you rely on them. Keep answers concise and practical."
)


def _evidence_block(case_number: str, evidence: dict[str, Any]) -> str:
    payload = {
        "caseNumber": case_number,
        "seedCase": evidence.get("seedCase") or evidence.get("seed_case"),
        "precedents": evidence.get("precedents") or [],
        "knowledgeArticles": evidence.get("kbArticles") or evidence.get("kb_articles") or [],
        "incident": evidence.get("incident"),
        "draft": evidence.get("draft"),
    }
    return "Evidence gathered so far:\n" + json.dumps(payload, ensure_ascii=False)


def answer_question(
    llm: Any,
    *,
    case_number: str,
    question: str,
    history: list[dict[str, str]] | None = None,
    evidence: dict[str, Any] | None = None,
) -> str:
    messages: list[Any] = [
        SystemMessage(content=SYSTEM_PROMPT),
        SystemMessage(content=_evidence_block(case_number, evidence or {})),
    ]
    for turn in history or []:
        role = turn.get("role")
        content = turn.get("content", "")
        if role == "assistant":
            messages.append(AIMessage(content=content))
        else:
            messages.append(HumanMessage(content=content))
    messages.append(HumanMessage(content=question))

    response = llm.invoke(messages)
    content = getattr(response, "content", response)
    return str(content).strip()
