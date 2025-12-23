# Theory Questions


## Question 1 — What is a foreign key and why is it important in relational databases?

Answer (English):
A foreign key is a column (or set of columns) in one table that references the primary key of another table. It defines a relationship between the two tables and enforces referential integrity: it prevents references to rows that do not exist and helps avoid orphan records. Foreign keys make joins possible and help maintain consistent data when rows are updated or deleted (for example with ON DELETE CASCADE or RESTRICT rules).

Suggested 2-minute script (English):
"A foreign key is a field in a table that points to the primary key of another table. For example, in our project `bookings.user_id` references `users.id`, which ensures every booking is associated with a valid user. The main benefit is referential integrity — the database will prevent invalid references and this makes joins and reports reliable. Many databases also let you configure cascading behavior so related rows can be deleted or updated safely. In short, foreign keys keep related data consistent and make it easier to query connected information."

Short Bengali translation (for recording):
"Foreign key হলো একটি টেবিলের কলাম যা অন্য টেবিলের primary key কে নির্দেশ করে। উদাহরণ—`bookings.user_id` `users.id` কে রেফার করে। এটি ডেটার সঙ্গতি বজায় রাখে এবং ভুল রেকর্ড রোধ করে।"

---

## Question 2 — What is the difference between WHERE and HAVING clauses in SQL?

Answer (English):
`WHERE` filters individual rows before any grouping or aggregation happens. `HAVING` filters groups after aggregation (after `GROUP BY`) and can use aggregate functions like `COUNT()` or `SUM()`. You cannot use aggregate functions in `WHERE` directly — use `HAVING` for conditions on aggregated results.

Suggested 2-minute script (English):
"The `WHERE` clause filters rows before aggregation, so it is applied to each row and cannot use aggregate functions. For example, `WHERE salary > 50000` will keep rows with high salaries only. On the other hand, `HAVING` filters the results after `GROUP BY` — it operates on groups and can use aggregates like `HAVING COUNT(*) > 5`. So when you want to filter groups based on aggregated metrics, use `HAVING`; otherwise use `WHERE` for row-level conditions."

Short Bengali translation:
"WHERE স্কোপটি প্রতিটি রোতে প্রযোজ্য এবং aggregation-এর আগে কাজ করে; আর HAVING গ্রুপগুলোর উপর aggregation-এর পরে শর্ত আরোপ করে এবং aggregate ফাংশন ব্যবহার করা যায়।"

---

## Question 3 — What is a primary key and what are its characteristics?

Answer (English):
A primary key is a column (or set of columns) that uniquely identifies each row in a table. Characteristics: it must be unique, not null, and ideally stable (not change frequently). Primary keys are often indexed, and other tables can reference them using foreign keys. They provide fast lookups and guarantee row identity.

Suggested 2-minute script (English):
"A primary key uniquely identifies every record in a table. For instance, `users.id` is a primary key in our system. It must be unique and not null — that way we can reliably find a single user by that id. Primary keys are typically indexed for performance and are used by foreign keys from other tables to create relations. Good primary key design keeps data consistent and queries fast."

Short Bengali translation:
"Primary key হলো এমন একটি কলাম যা প্রতিটি রেকর্ডকে অনন্যভাবে শনাক্ত করে — এটি unique এবং null নয়। এটি সাধারণত indexed থাকে এবং অন্যান্য টেবিলের foreign key দ্বারা রেফার করা হয়।"

---

## Question 4 — What is the difference between INNER JOIN and LEFT JOIN in SQL?

Answer (English):
`INNER JOIN` returns rows where there is a match between both tables on the join condition. `LEFT JOIN` (or `LEFT OUTER JOIN`) returns all rows from the left table and matched rows from the right table; if there is no match, the right-side columns are NULL. Use `INNER JOIN` when you only want matched data and `LEFT JOIN` when you want all left-side rows even without matches.

Suggested 2-minute script (English):
"An `INNER JOIN` gives you only rows that match in both tables — for example, users who have bookings. A `LEFT JOIN` returns all rows from the left table and the matching rows from the right; if there’s no match the right-hand fields become NULL. So if you want to list all users along with any bookings they might have (including users with zero bookings), use `LEFT JOIN`. If you only want users who actually have bookings, use `INNER JOIN`."

Short Bengali translation:
"INNER JOIN কেবলমাত্র মিল পাওয়া রেকর্ডগুলো ফেরত দেয়; LEFT JOIN বাম পাশের সব রেকর্ড দেয় এবং ডান পাশ থেকে মিল পাওয়া রেকর্ডগুলো যোগ করে, মিল না থাকলে ডান পাশের ফিল্ডগুলো NULL হয়।"

---

## Recording Tips
- Keep each answer focused: define the term, give an example (preferably from this project), and state why it matters.
- Speak slowly and clearly, pause between sentences, and keep to about two minutes per question.
- Practice once or twice before recording; this is a safe space to build confidence.

---

Good luck — your confidence will grow with every recording!