# SNS&SQS

## Questions

1. SNS 是什么服务？解决什么问题？
   - SNS 是高度可用、持久、安全、完全托管的发布/订阅消息收发服务；
   - 可以轻松分离微服务、分布式系统和无服务器应用程序。提供面向高吞吐量、多对多推送式消息收发的主题，借助不同的终端服务实现并行处理
2. SQS 是什么服务？解决什么问题？
   - 是一种完全托管的消息队列服务，可用于分离和扩展微服务、分布式系统和无服务器应用程序
   - SQS 消除了与管理和运营消息型中间件相关的复杂性和开销,借助 SQS，可以实现软件组件间发送、存储和接收任何规模的消息

## Tasking

- [x] Basic
  - [x] Trigger SNS every 5mins
  - [x] SNS send email with event content
  - [x] SQS subscription SNS
  - [x] SQS config retention(7days) / timeout(5mins)
  - [x] SQS trigger lambda
  - [x] Lambda send event log to cloudwatch
- [ ] Advance
  - [ ] SNS logging / encryption / retry / permission
  - [x] DLQ for Email Subscription
  - [x] SNS encryption
  - [x] SQS Taging
  - [x] CFN
- [ ] Nice to have
  - [x] Minimal permision
  - [x] Fail message alert
  - [ ] Docker deploy
