# Caching Strategy

## Cached Endpoint

GET /tasks

## Cache Duration

60 seconds

## Cache Invalidation

Cache clears when:
- Task created
- Task updated
- Task deleted

## Limitation

In-memory cache resets after server restart.