import { House } from './house';

describe('House', () => {
  it('should create an instance', () => {
    expect(new House('Asturias', 'Langreo', 'calle2','titulo2', 'descripcion2', 4, 2, 2, 0, 120, true, 60, true, '')).toBeTruthy();
  });
});
