# patient-portal

My patient portal.

## Development

- Create your DB

```
docker run -d --name patient_db -p 5433:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=patient-portal123 -e POSTGRES_DB=patient_portal -e POSTGRES_HOST=localhost -e POSTGRES_PORT=5433 -v db_volume:/var/lib/postgresql postgres:latest
```

postgres://postgres:patient-portal123@patient_db:5433

## Running Application
- Create two terminals and cs into the `/patient-portal` directory. In one terminal, run next using command `npm run dev`. In the second terminal, run server with command `node server.js`.

## Features:

- Registration with creation of token
- Login authorization
- Dietitian-specific Assessments
- User informed of Initial Assessments and Reassessments due in 3 days
- React-query to fetch and cache data


## V2 Features:
- Expand application to core hospital roles - nursing, pharmacist, management, etc.
- Include role upon Registration and store roles on Worker Table
- UI based on role user is associated with, allowing key features specific to job i.e. ordering medication (pharm/RN permission)
