export const tufCpData = [
  {
    category: "CP Topic 1: Number Theory & Sieve",
    problems: [
      {
        id: "tcp-1",
        title: "Sieve of Eratosthenes (Prime Generation)",
        difficulty: "medium",
        platform: "gfg",
        link: "https://www.geeksforgeeks.org/sieve-of-eratosthenes/",
        description: "Given a number N, find all prime numbers smaller than or equal to N in O(N log(log N)).",
        examples: [{ input: "N = 20", output: "[2, 3, 5, 7, 11, 13, 17, 19]" }],
        constraints: ["1 <= N <= 10^7"],
        solutionHint: "Create boolean array isPrime, mark multiples of each prime starting from p*p.",
        starterCode: `function sieveOfEratosthenes(n) {\n  const isPrime = new Array(n + 1).fill(true);\n  isPrime[0] = isPrime[1] = false;\n  for (let p = 2; p * p <= n; p++) {\n    if (isPrime[p]) {\n      for (let i = p * p; i <= n; i += p) isPrime[i] = false;\n    }\n  }\n  const primes = [];\n  for (let i = 2; i <= n; i++) if (isPrime[i]) primes.push(i);\n  return primes;\n};`,
      },
      {
        id: "tcp-2",
        title: "Modular Exponentiation (a^b % mod)",
        difficulty: "medium",
        platform: "gfg",
        link: "https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/",
        description: "Compute (a^b) % m in O(log b) time.",
        examples: [{ input: "a = 2, b = 10, m = 1000", output: "24" }],
        constraints: ["1 <= a, b, m <= 10^9"],
        solutionHint: "Multiply base and square it modulo m at each step.",
        starterCode: `function power(a, b, m) {\n  let res = 1n, base = BigInt(a) % BigInt(m), exp = BigInt(b), mod = BigInt(m);\n  while (exp > 0n) {\n    if (exp % 2n === 1n) res = (res * base) % mod;\n    base = (base * base) % mod;\n    exp = exp / 2n;\n  }\n  return Number(res);\n};`,
      },
    ],
  },
  {
    category: "CP Topic 2: Disjoint Set Union (DSU)",
    problems: [
      {
        id: "tcp-3",
        title: "Disjoint Set Union (Union by Rank & Path Compression)",
        difficulty: "hard",
        platform: "gfg",
        link: "https://takeuforward.org/data-structure/disjoint-set-union-union-by-rank-union-by-size-path-compression-g-46/",
        description: "Implement Disjoint Set data structure with findParent (path compression) and unionByRank in near O(1) alpha(N).",
        examples: [{ input: "Union(1, 2), Union(2, 3), isSame(1, 3)", output: "true" }],
        constraints: ["1 <= N <= 10^5"],
        solutionHint: "Parent array with path compression and rank array to balance tree height.",
        starterCode: `class DisjointSet {\n  constructor(n) {\n    this.parent = Array.from({ length: n + 1 }, (_, i) => i);\n    this.rank = new Array(n + 1).fill(0);\n  }\n  find(u) {\n    if (this.parent[u] === u) return u;\n    return this.parent[u] = this.find(this.parent[u]);\n  }\n  union(u, v) {\n    const rootU = this.find(u), rootV = this.find(v);\n    if (rootU === rootV) return;\n    if (this.rank[rootU] < this.rank[rootV]) this.parent[rootU] = rootV;\n    else if (this.rank[rootV] < this.rank[rootU]) this.parent[rootV] = rootU;\n    else { this.parent[rootV] = rootU; this.rank[rootU]++; }\n  }\n}`,
      },
    ],
  },
];
