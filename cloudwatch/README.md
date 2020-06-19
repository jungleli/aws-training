# CloudWatch

### Basic

- CloudWatch 是什么？我们为什么要使用 CloudWatch？
  1. CloudWatch 是用来实时监控 AWS 资源以及 AWS 中运行的应用程序的服务。
  2. 使用 CloudWatch 来收集和跟踪相关资源指标，设置阈值，从而全面地了解资源使用率、应用程序性能和运行状况，和其他资源结合使用（CloudTrail，SNS，EC2 Auto Scaling 等），从而对资源进行动态调整。
- CloudWatch 中的 metrics 是什么？包括哪些种类？我们可以如何使用 metrics？
  1. Metric 是衡量系统性能相关的数据
  2. EC2、ELB、RDS、S3、EBS、EFS、ElasticBeanstalk
  3. 利用 metric 获取统计数据、绘制图表，创建警报
- CloudWatch Events 是什么？可以应用在哪些场景？
  1. 近乎实时的描述 AWS 资源变化的系统事件流
  2. 可以和多种 AWS 资源配合使用
     1. AWS CloudTrail 可用于监控对您的账户的 CloudWatch Events API 的调用
     2. AWS CloudFormation
     3. AWS config
     4. IAM
     5. lambda
- 相关概念理解：metrics，periods，namespace，count，dimensions，statistics。
  1. metrics：指标表示一个发布到 CloudWatch 并且按时间排序的数据点集。可将指标视为要监控的变量，而数据点代表该变量随时间变化的值
  2. periods：时间段是与特定 Amazon CloudWatch 统计信息关联的时间的长度。每项统计信息代表在指定时间段内对收集的指标数据的聚合。
  3. namespace：CloudWatch 指标的容器。不同命名空间中的指标彼此独立，因此来自不同应用程序的指标不会被错误地聚合到相同的统计信息中。
  4. count？？ [Unit](https://docs.aws.amazon.com/zh_cn/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace)
  5. dimensions：维度是一个名称/值对，它是指标标识的一部分
  6. statistics：统计数据 是指定时间段内的指标数据聚合

### Operation

- Create resource for monitor metrics by cloudformation
  `aws cloudformation deploy --template-file LambdaMetrics.yml --stack-name cf-metircs-jlli`
- Create resource for monitor log
  `aws cloudformation deploy --template-file CloudWatchLambdaLogs.yml --stack-name cf-logs-jlli`
