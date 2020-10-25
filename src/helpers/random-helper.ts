export default class RandomHelper {
  static getRandom<T extends { value: number }>(options: T[], log: string[]): T {
    const totalSum = options.reduce((sum, option) => option.value + sum, 0);

    const num = Math.random() * totalSum;
    let result: T = undefined as any;

    if(options.length > 2) {
      // log.push(`-> Options: ${options.map(o => o.value).join(', ')}`);
    }

    options.reduce((sum, item) => {
      sum += item.value;
      
      if (num < sum && result === undefined) {
        result = item;
      }

      return sum;
    }, 0);

    const selected = result || options[options.length - 1];
    // log.push(`-> Selected: ${selected.value}`);

    return selected;
  };
}