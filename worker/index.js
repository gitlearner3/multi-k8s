const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();
//const sub = redis.createClient({
//  host: keys.redisHost,
//  port: keys.redisPort,
//  retry_strategy: () => 1000
//});

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
//  console.log("doing something on " + message);
  redisClient.hset('values', message, fib(parseInt(message)));
});
//sub.subscribe('insert', (error) => {
// if (error) {
//  throw new Error(error);
//}
//  console.log('Subscribed to insert channel.');
//});
sub.subscribe('insert');
console.log(keys.redisHost)
