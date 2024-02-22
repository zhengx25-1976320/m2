test('test routes', () => {
  routes.get('routes', (e, v) => {
    expect(e).toBeFalsy();
    expect(v).toBe(routes);
    done();
  });
});

test('test comm', () => {
  routes.get('comm', (e, v) => {
    expect(e).toBeFalsy();
    expect(v).toBe(comm);
    done();
  });
});
test('(0 pts) sample test', () => {
  routes.get('echo', (e, v) => {
    expect(e).toBeFalsy();
    expect(v.echo()).toBe('echo!');
    done();
  });
});
test('(0 pts) sample test', () => {
  const t = true;
  expect(t).toBe(true);
});
test('(0 pts) sample test', () => {
  const t = true;
  expect(t).toBe(true);
});
