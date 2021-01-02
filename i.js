process.stdin.on('data', (data) => {
  process.stdout.write(`new data: ${data.toString().toUpperCase()}`)
})
