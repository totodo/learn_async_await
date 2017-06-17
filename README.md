# async function

### Syntax

```
async function name([param[, param[, ...param]]) {
    statements
}
```

##### Return value
An `AsyncFunction` object, representing an asynchronous function which executes the code contained within the function.

### Description
When an async function is called, it returns a `Promise`. When the async function returns a value, the Promise will be 
resolved with the returned value. When the async function throws an exception or some value, the Promsie will be rejected
with the thrown value

An async function can contain an `await` expression, that pauses the execution of the async function and waits for the 
passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.

*tips*
The purpose of  async/await functions is to simplify the behavior of using promises synchronously and to perform some 
behavior on a group of Promise. Just like Promises are similar to structured callbacks, async/await is similar to 
combining generators and promises


