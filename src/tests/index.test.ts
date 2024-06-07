import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
	it('adds 2 + 2 to equal 4', () => {
		expect(2 + 2).toBe(4);
	});
});