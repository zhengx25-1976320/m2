# M2: Actors and Remote Procedure Calls (RPC)

> Full name: `zhengyang xu`
> Email: `zhengyang_xu@brown.edu`
> Username: `xzhengy1`

## Summary

> Summarize your implementation, including key challenges you encountered

My implementation comprises `3` software components, totaling `400` lines of code. Key challenges included `1. how to parse the http and map the function. 2. implementing RPC. I created a to local map, and pass a callback function`.

## Correctness & Performance Characterization

> Describe how you characterized the correctness and performance of your implementation

_Correctness_: I wrote `3` tests; these tests take `17.2s` to execute.

_Performance_: Evaluating RPC performance using [high-resolution timers](https://nodejs.org/api/perf_hooks.html) by sending 1000 service requests in a tght loop results in an average throughput of `0.87` requests per second and an average latency of `0.43` ms.

## Key Feature

> How would you explain your implementation of `createRPC` to your grandparents (assuming your grandparents are not computer scientists...), i.e., with the minimum jargon possible?

Hi, grandpa. Because some functions require global variables to run, I sent the wrapper of local function to other node. When the other node calls the function, acutally it is run on local node, and we send back the output.

## Time to Complete

> Roughly, how many hours did this milestone take you to complete?

Hours: `15 hours`
