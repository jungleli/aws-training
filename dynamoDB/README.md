# DynamoDB

### 1. SQL 与 NoSQL 的区别

|            | SQL                                              | NoSQL                                      |
| ---------- | ------------------------------------------------ | ------------------------------------------ |
| 数据存储   | 固定的表结构；固定化的查询、修改语句等；         | 非结构化存储，支持多种数据模型；文档查询； |
| 数据一致性 | 所有存储过程具有原子性、一致性、隔离性、持久性； | 保证数据最终的一致性，不强调过程的一致性； |
| 可扩展性   | 集中式扩展，从硬件着手纵向扩展                   | 分布式体系横向扩展，更易于支持大规模数据   |

### 2. DynamoDB 概念

- Table, Item, Attributes

  - Table： 数据集合
  - Item： 集合中的一条数据，SQL 中的一行数据，
  - Attributes：组成单条数据的元数据，单条数据可以包含一个或多个属性；

- Primary Key
  用于唯一标识表中的每一个项目，具有唯一性；DynamoDB 支持的数据类型为字符串、数字和二进制，支持两种主键：

  - 分区键（hash key）
  - 分区键和排序键（range key）

- Secondary Indexes
  可以使用一些替代键来生成二级索引对表进行查询，满足不同的查询需求。
- DynamoDB Stream
  用于记录对数据库的增删改操作，并和其它 AWS 结合发挥更大的效用。
- 数据类型
  - 标量类型：数字、字符串、二进制、布尔值、null。
  - 文档类型，可表示具有嵌套属性的复杂结构，包括列表和映射。
  - 集类型，同一集种数据类型必须一致，且值唯一，包括字符串集、数字集和二进制集。
- 数据一致性
  数据读取具有最终结果的一致性，在短时内的请求可能响应旧结果；允许指定强一致性读取数据的方式。

- 读/写容量模式
  收费模式，按需收费或预置套餐；

- 分区与数据分配
  数据存储容量分配；

### 3. DynamoDB API

- CreateTable 创建新表，可以包含一个或多个二级索引并启用 DynamoDB 流
- DescribeTable 返回有关表的信息，例如，表的主键架构、吞吐量设置和索引信
- ListTables 返回列表中您的所有表的名称。
- UpdateTable 修改表或其索引的设置、创建或删除表上的新索引或修改表的 DynamoDB 流设置。
- DeleteTable 从 DynamoDB 中删除表及其所有依赖对象。
- PutItem 写入单条数据。需要指定主键属性，可以不指定其他属性。
- BatchWriteItem 可一次性写入最多 25 条数据。也可以批量删除多个项目。
- UpdateItem 修改项目中的一个或多个属性，需要指定待修改的项目的主键。
- GetItem 查询单条数据，需指定主键。可以检索整个项目，也可以仅检索其属性的子集。
- BatchGetItem 从一个或多个表中检索最多 100 个项目。
- Query 检索具有特定分区键的所有项目，必须指定分区键值。
- Scan 检索指定表或索引中的所有项目。
- TransactWriteItems 一种批处理操作，用于在表内和跨表对多个项目执行 Put、Update 和 Delete 操作，并保证得到全有或全无结果。
- TransactGetItems 一种批处理操作，用于执行 Get 操作以从一个或多个表检索多个项目。

### 4. 练习(AWS Console and AWS CLI)

- CLI
  - aws dynamodb delete-table \
    --table-name Project_JLLI222
  - aws dynamodb describe-table \
    --table-name Project_JLLI222
  - aws dynamodb update-table \
    --table-name Project_JLLI \
    --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10

### 5. Questions

1. 以下哪种是 NoSql 数据库?
   all，图数据库、 键-值存储库、列式数据库、文档数据库

2. 下面哪些场景 SQL 不能发挥作用?
   数据不是结构化的

3. DynamoDB 有哪两种类型的主键?
   - 分区键（hash key）
   - 分区键和排序键（range key）
4. 主键不支持的数据类型?
   array

5. DynamoDB 支持哪两种类型的索引,这两种索引的区别是什么?
   - Global secondary index
   - Local secondary index
     主要区别体现在键架构，分区键值大小限制，对索引的操作，读取一致性等方面，详细参考：[link](https://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/developerguide/SecondaryIndexes.html)

### 6. Coding

- node create.js Project_JLLI
- node update.js Project_JLLI
- node get.js Project_JLLI
- node delete.js Project_JLLI

本地测试：
Follow the [link](https://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) to set up env.

- start server，by default the endport is 8000, add --endpoint-url to point local db:
  `java -Djava.library.path=./DynamoDBLocal_lib -jar ~/Downloads/dynamodb_local_latest/DynamoDBLocal.jar -sharedDb`

Cli command
`aws dynamodb list-tables --endpoint-url http://localhost:8000`

#### 7. DynamoDB 事务

TransactWriteItems： DynamoDB 事务可以分组执行多个 Put、Update、Delete 和 ConditionCheck 操作，通过将多个操作作为单个 TransactWriteItems 操作提交，最终结果按整体成功或失败。
TransactGetItems： 对于多个 Get 操作，可以合并为单个 TransactGetItems 操作提交。
最终为了保证操作结果的一致性。

### 8. 备份与还原

- 备份表
  `aws dynamodb create-backup --table-name Project_JLLI \ --backup-name Project_JLLI_Backup`

- 还原表

      - get backup-arn： `aws dynamodb list-backups`
      - `aws dynamodb describe-backup \

  --backup-arn <arn>`-`aws dynamodb restore-table-from-backup \
  --target-table-name Project_JLLI \
  --backup-arn <arn>`

- 还原到时间点 - Verify 是否已启用时间点恢复 `aws dynamodb describe-continuous-backups \ --table-name Project_JLLI` - `aws dynamodb restore-table-to-point-in-time \ --source-table-name Project_JLLI \ --target-table-name Project_JLLI_Test_Restore \ --use-latest-restorable-time`
