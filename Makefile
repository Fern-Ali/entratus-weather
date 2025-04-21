# === FastAPI backend ===

venv:
	python3 -m venv backend/venv

install:
	cd backend && source venv/bin/activate && pip install -r requirements.txt

run:
	cd backend && source venv/bin/activate && uvicorn main:app --reload

test:
	cd backend && source venv/bin/activate && pytest

# === React frontend ===

frontend-install:
	cd frontend && npm install --legacy-peer-deps

frontend-run:
	cd frontend && npm run dev
