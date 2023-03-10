import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getReleaseTag from '../src/services/releaseService';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks();
});

describe('test with prefix', () => {
  it.each([
    [undefined],
    [null],
    ['abc'],
    ['1.0.0.0'],
    ['22.1.2.6'],
    ['v'],
    ['v2'],
    ['v2.1'],
    ['v2.1.1.5'],
    ['v2022.11.3-beta'],
  ])(
    'should return first version when invalid version is passed',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-10-13'));
      console.log(input);
      expect(getReleaseTag('v', input)).toBe('v2022.10.13.1');
    }
  );

  it('should throw exception when malformed version is passed', () => {
    vi.setSystemTime(new Date('2022-10-13'));
    expect(getReleaseTag('v', 'v2.1')).toBe('v2022.10.13.1');
  });

  it('should return version with same month and year with incremented iteration', () => {
    vi.setSystemTime(new Date('2022-11-24'));
    expect(getReleaseTag('v', 'v2022.11.24.5')).toBe('v2022.11.24.6');
  });

  it.each([['v2022.10.4.23'], ['v2022.2.6.21']])(
    'should return version with reset iteration, current month and same year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-11-24'));
      expect(getReleaseTag('v', input)).toBe('v2022.11.24.1');
    }
  );

  it.each([['v2022.12.12.2'], ['v2020.05.8.14']])(
    'should return version with reset iteration, current month and year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2023-01-02'));
      expect(getReleaseTag('v', input)).toBe('v2023.1.2.1');
    }
  );
});

describe('test without prefix', () => {
  it.skip.each([
    [undefined],
    [null],
    ['1.0.0'],
    ['v22.1.6.2'],
    ['v'],
    ['2'],
    ['2.1'],
    ['2.1.1.5'],
    ['2022.11.3-beta'],
  ])(
    'should return first version when invalid version is passed',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-10-13'));
      expect(getReleaseTag('', input)).toBe('2022.10.13.1');
    }
  );

  it('should not throw exception when malformed version is passed', () => {
    vi.setSystemTime(new Date('2022-10-13'));
    expect(getReleaseTag('', '2022.1')).toBe('2022.10.13.1');
  });

  it('should return version with same month and year with incremented iteration', () => {
    vi.setSystemTime(new Date('2022-11-24'));
    expect(getReleaseTag('', '2022.11.24.5')).toBe('2022.11.24.6');
  });

  it.each([['2022.10.24.23'], ['2022.2.24.21']])(
    'should return version with reset iteration, current month and same year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2022-11-24'));
      expect(getReleaseTag('', input)).toBe('2022.11.24.1');
    }
  );

  it.each([['2022.12.2.2'], ['2020.05.2.14']])(
    'should return version with reset iteration, current month and year',
    (input: string | null | undefined) => {
      vi.setSystemTime(new Date('2023-01-02'));
      expect(getReleaseTag('', input)).toBe('2023.1.2.1');
    }
  );
});
