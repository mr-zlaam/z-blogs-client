import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 50, // Number of Virtual Users
  duration: "1m", // Duration of the test
};

export default function () {
  const res = http.get("http://localhost:8000/api/v2/blog/getAllPublicBlogs"); // Replace with your endpoint

  check(res, {
    "is status 200": (r) => r.status === 200,
    "response time is < 200ms": (r) => r.timings.duration < 200,
  });

  sleep(1); // Simulate user think time
}
