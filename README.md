# patient-portal

My patient portal.

## Development

- Create your DB

```
docker run -d --name patient_db -p 5433:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=patient-portal123 -e POSTGRES_DB=patient_portal -e POSTGRES_HOST=localhost -e POSTGRES_PORT=5433 -v db_volume:/var/lib/postgresql postgres:latest
```

postgres://postgres:patient-portal123@patient_db:5433

- blah blah blah
