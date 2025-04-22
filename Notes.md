# app.use(express.json());
- express.json() ek built-in middleware function hai Express.js ka.
- Jab client (jaise frontend ya Postman) koi HTTP request bhejta hai JSON format mein body ke saath, to Express ko us body ko parse karne ke liye kuch chahiye hota hai.
- Ye middleware automatically us JSON ko JavaScript object mein convert kar deta hai.

# Example :
- Agar frontend se aisa data bheja ja raha hai:
- {"name": "Vikram","email": "vikram@gmail.com"}

- Aur tumne backend mein express.json() use nahi kiya, to:
- app.post('/api/users', (req, res) => { console.log(req.body); // ❌ undefined aayega });

- Par agar tum use karte ho:
- app.use(express.json());
- app.post('/api/users', (req, res) => {    console.log(req.body); // ✅ { name: 'Vikram', email: 'vikram@gmail.com' }  });

### --------------------------------------------------------
# 🧾 Prisma Kya Hota Hai?
- Prisma ak ORM (Object Relational Mapping) tool hai jo backend developer use karte hai to work easily with database.

- 👉 ORM :
- ORM (Object Realtional Mapping) - iska matlab hai ki tum apne database ke tables ko javaScript/TypeScript ke objects ke roop mein treat karte ho.
- Bina ORM : we write query manually :
- SELECT * FROM users WHERE id = 1;
- With ORM : we create only object of that query :
- const user = await prisma.user.findUnique({   where: { id: 1 }    });

# 🧠 Ek Chhota Sa Analogy:
- Database Table = Excel sheet ke jaise
- ORM = Excel sheet ko JS object ke form mein access karne wala translator

# 🔧 Prisma Kya Karta Hai?
- Tumhare database ko models (schema) ke form mein define karta hai
- Automatically tumhare liye queries generate karta hai (SELECT, INSERT, UPDATE, DELETE)
- Tumhe SQL likhne ki zarurat nahi hoti, Prisma uska kaam handle kar leta hai
- Type safety deta hai (especially TypeScript ke saath)
- Auto migration, validation, and relationship handling karta hai

# 📁 Backend Project Mein Prisma Kyu Use Karte Hain?
- Easy Database Access:
    - Tum easily prisma.user.findMany() likh ke saare users fetch kar sakte ho. SQL query likhne ki need nahi.
- Type Safety (especially with TypeScript):
    - Tumhare model ke according IntelliSense milta hai. Galat property likhi to build time pe hi error aayega.
- Database Migration:
    - Tum agar schema mein kuch change karte ho (schema.prisma file mein), to Prisma migration files bana deta hai jo tumhare database ko update kar deti hain.
- Scalability aur Maintainability:
    - Large projects mein Prisma maintain karna easy hota hai compared to raw SQL queries.

# ❓ Bina Prisma ke Project Bana Sakte Hain Kya?
- Haan, bilkul bana sakte hain!
    - Prisma ek optional tool hai, zaroori nahi hai ki har project mein use ho:
    - 🔸 Alternatives:
    - Raw SQL queries (manual query likhni padti hai)
    - Knex.js (query builder)
    - Sequelize (ORM)
    - Mongoose (MongoDB ke liye)
    - Agar tum chhota project bana rahe ho, ya tumhe SQL aata hai to Prisma ke bina bhi kaam ho jaata hai.

# 🗃️ Kya Prisma Sirf Specific Database Ke Saath Kaam Karta Hai?
- Nahi, Prisma multiple popular relational databases ke saath kaam karta hai:
- PostgreSQL, MySQL, SQLite, SQL Server, MongoDB.

- 🔶 Limitations of Prisma with MongoDB:
    - Prisma abhi bhi relational databases ke liye best suited hai.
    - MongoDB ke saath kuch features limited hote hain jaise:
    - Joins (relations) ka support kam hai
    - Aggregation pipeline ka limited control
    - Nested/embedded documents ka limited handling

# 📘 Prisma Kaise Use Karte Hain? (Short Overview) :
- npm i prisma
- npm i @prisma/client
- 🧠 Matlab: Ek Prisma ka tool install ho raha hai, aur doosra Prisma ka runtime client jo code mein use hota hai.
- @prisma/client:
    - Ye actual client library hai jo tumhare Node.js code se database se connect aur query karne ke liye kaam aati hai.

- npx prisma init :
- Ye command ek prisma/ folder banata hai project ke root mein.
- Is folder ke andar do cheezein hoti hain:
    - schema.prisma file
        - Is file mein tum apna database structure define karte ho, jaise models (User, Post, etc.)
    - .env file
        - Isme tumhara database ka connection string hota hai, jisse Prisma pata karta hai ki kaunse DB se connect karna hai.

# docker run --name leetlab -e POSTGRES_USER=vikramkumar -e POSTGRES_PASSWORD=vikramkumar0122363012627 -p 5432:5432 -d postgres
- Yeh command ek PostgreSQL database ko Docker container ke through chalu karta hai.
     - docker run - Docker container ko run karne ke liye
     - --name leetlab - aap kya naam dena chhate ho us container ko
     - -e - Environment Variables
     - POSTGRES_USER= ? - aap apne according username set kar sakte ho
     - POSTGRES_PASSWORD=? - aaha aap password set kro jo rakhna chhate ho 
     - -p 5432:5432 -  Local machine ka port 5432 map kar rahe ho Docker container ke 5432 port se (default PostgreSQL port)
     - -d postgres - -d means detached mode(detached mode : kahne ka matlb hai ki aap teriminal ko busy nhi rah rahe ho , dusra bhi command run kar sakte ho lekin "Atached mode :" ka matlab hota hai ki aap terminal ko busy rah rhe ho, jab taak aap terimnal ko stop nhi kar dete manually tab taak aap dusra command nhi run kar sakte)  aur postgres means image name

- npx prisma generate :
    - Yeh command Prisma Client ko generate karti hai.

- npx prisma migrate dev :
    - Yeh command database schema ke changes ko migrate karne ke liye hoti hai development ke dauraan.
    - Jo changes aapne schema.prisma file mein kiye hain, wo SQL migration files mein convert hote hain.
    - Phir woh migration real database mein apply hoti hai.
    - Yeh command ek new migration folder create karti hai under prisma/migrations/.

- npx prisma db push:
- Yeh command schema changes ko seedha database mein push karti hai, without generating migration files.
- 📌 Kab use karein?
- Jab aap quick prototype banana chahte ho
- Ya test project mein ho jahan migration ka record rakhna zaruri nahi

# 🔍 Difference from migrate dev:
- migrate dev	                    - db push
- Migration file banata hai	        - Nahi banata
- Production ke liye use hota hai	- Sirf development ya prototyping ke liye
- Rollback possible	                - Rollback nahi hota

### -----------------------------------------------------------------
# 🔷 PostgreSQL Kya Hota Hai?
- PostgreSQL (pronounced as "Post-Gres") ek open-source, object-relational database management system (ORDBMS) hai.
- Ye structured data ko store karne ke liye use hota hai.
- SQL (Structured Query Language) ka use karta hai.
- Ye ACID-compliant hai — yani data reliable, safe aur consistent hota hai.
- Free & Open Source hai, community-supported hai.

# 🔹 PostgreSQL Ki Features:
- Feature	Description : 
    - ✅ Open Source - Free mein use kar sakte ho, commercial project ke liye bhi
    - ✅ SQL Compliant - SQL language use karta hai for querying
    - ✅ ACID Compliance - Atomicity, Consistency, Isolation, Durability — ensure karta hai secure transactions
    - ✅ Complex Queries - Support	Joins, nested queries, CTEs, triggers etc.
    - ✅ Extensibility - Custom data types, functions, etc.
    - ✅ JSON Support - Structured + semi-structured data store kar sakta hai
    - ✅ Concurrency - Multiple users ke saath safely kaam karta hai (MVCC support)
    - ✅ Indexing - Fast search ke liye B-Tree, GIN, GiST indexing
    - ✅ Cross-Platform - Windows, Linux, Mac sab pe kaam karta hai

# 🧠 PostgreSQL Kab Use Karna Chahiye?
- ✅ Use PostgreSQL when:
    - Structured data ho jiska schema fix ho — jaise:
        - Users, Products, Orders, Blogs, etc.
    - Data relationships important ho:
        - Users & Orders → One-to-Many
        - Courses & Students → Many-to-Many
    - Complex queries likhne ho:
        - Reports, filters, joins, analytics
    - ACID-compliance chahiye:
        - Bank apps, e-commerce, transactions
        - Mature & stable RDBMS chahiye
        - Aapko SQL likhna aata ho ya seekhna ho

# 🚫 Kab PostgreSQL Use Nahi Karna Chahiye?
- ❌ Avoid PostgreSQL when:
    - Highly flexible or unstructured data chahiye:
        - Logs, real-time chat messages, IoT sensor data
        - Aapko frequently schema change karna padta hai → MongoDB better option ho sakta hai
    - Horizontal scaling bahut jyada chahiye:
        - Bahut huge datasets (terabytes) across multiple servers → NoSQL databases jaise Cassandra ya DynamoDB better ho sakte hain
    - Graph-based data structure chahiye :
     - Social media graphs → Neo4j is better
    - Aap chhoti app bana rahe ho jisme data integrity critical nahi: → SQLite or JSON file bhi kaam chala sakti hai

# 📌 PostgreSQL vs MySQL vs MongoDB
# Feature : PostgreSQL  -   MySQL   -   MongoDB
- Type   :  Relational (SQL) : Relational (SQL) : NoSQL (Document DB)
- Schema : Strict : Strict : Flexible
- Joins : Strong : Moderate  : Weak / via $lookup
- Speed  : Fast with joins  : Fast in simple queries : Super fast (no joins)
- JSON Support : Yes (very good) : Yes (basic) : Native format
- Transactions : Full : support	: Yes	Limited
- Best Use	: Complex structured apps	Simple web apps	: Dynamic data apps

# 🔨 Tools for PostgreSQL
# Tool	            - Use
- pgAdmin	    GUI interface to manage PostgreSQL
- DBeaver	    Universal DB GUI (works for PostgreSQL, MySQL, etc.)
- psql	        PostgreSQL terminal client
- Prisma	    ORM tool (code se PostgreSQL handle karna)
- TypeORM / Sequelize	Aur bhi ORM alternatives

# 🧪 Real-Life Examples Jahan PostgreSQL Use Hota Hai:
- E-commerce (Amazon-style): users, orders, inventory — relational data
- Banking systems: secure and transactional operations
- SaaS dashboards: structured reports & analytics
- Blog platforms: posts, comments, categories
- HR systems: employee, payroll, departments

🔚 Conclusion
- PostgreSQL ek full-featured, professional-level database hai jiska use aap har serious backend - project mein kar sakte ho — jab:
- Structured data ho
- Strong schema design chahiye
- Data safety aur consistency important ho
- Complex querying karni ho
- Agar aap Node.js, Express, Prisma, Docker ke saath kaam kar rahe ho — to PostgreSQL is one of the best choices.