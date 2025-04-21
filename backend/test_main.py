from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_fetch_data():
    res = client.get("/fetch_data?lat=37.8651&lon=-119.5383")
    assert res.status_code == 200
    assert "forecast" in res.json()

def test_results():
    res = client.get("/results?limit=5")
    assert res.status_code == 200
    assert "logs" in res.json()
