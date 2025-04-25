```psgl
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users;
```

- numeric type
- char type
- enum type
- timestamp type
- bit type
- check constraint


```
insert into users (username, password) values ('admin', "salt:hash")
  on conflict (username) do update set pass = 
  returning *
```

search with like

```sql
select 
  genre,
  case when genre like "%action%" then 0.1 else 0 end as bouns
from 
  movies
where 
  genre like "%action%";

```
full text search

geolocation search
vector, query,ts_rank 
```sql
select
  title
from 
  movies
where
  to_tsvector(title) @@ to_tsquery('start <-> (wars | trek) !(generations & kan)')
```
plainto_tsquery
phraseto_tsquery
websearch_to_tsqeury
```sql
select 
  websearch_to_tsquery('star wars or trek -clone ')
```

```sql
ts_headline(
  websearch_to_tsquery('star wars'), 'StartSel=<mark?>, stopSel=</mark>'
)
```
json_build_array
json_build_object
to_json
raw_to_json

json extraction
```sql
select ('{
  "order_id": x13f.
  "customer": {
    "name": "alice",
    "email": "alice@gmailc.com"
  },
  "items":[
    { "product": "apple", "price": 1.2},
    { "product": "banana", "price": 1.0},
  ],
  "status": "shipped"
}'::json)->>"status"
-- extract path
#>'{items, 0, product}'

jsonb_path_query('{
  "order_id": x13f.
  "customer": {
    "name": "alice",
    "email": "alice@gmailc.com"
  },
  "items":[
    { "product": "apple", "price": 1.2},
    { "product": "banana", "price": 1.0},
  ],
  "status": "shipped"
}', '$.items[0].product')
```

json contain
```sql
select '["apple", "banana"]'::jsonb @> '["apple"]'::jsonb

select *
FROM 
  orders_json
where
  details @> '{"status": "shipped"}'
  details->>'status' = "shipped"
```
