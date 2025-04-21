# === FastAPI backend ===

venv:
	python3 -m venv backend/venv

install:
	cd backend && . venv/bin/activate && pip install -r requirements.txt

run:
	backend/venv/bin/uvicorn main:app --reload --app-dir backend

test:
	backend/venv/bin/pytest backend/test_main.py

# === React frontend ===

frontend-install:
	cd frontend && npm install --legacy-peer-deps

frontend-run:
	cd frontend && npm run dev
