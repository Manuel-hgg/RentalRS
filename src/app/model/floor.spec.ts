import { Floor } from './floor';

describe('Floor', () => {
  it('should create an instance', () => {
    expect(new Floor('Asturias', 'Gijón', 'calle1','titulo1', 'descripcion1', 3, 2, 1, 0, 80, false, 50, 5, '')).toBeTruthy();
  });
});
