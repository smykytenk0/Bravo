import { Catalog } from '../interfaces/catalog.interfaces';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CatalogActions } from './catalog.actions';


export const initialState: Catalog = {
  products: [
    {
      productCode: 'APP123',
      name: 'Apples',
      mainUnit: {unit: 'kg', price: 2.03},
      availability: 'In Stock'
    },
    {
      productCode: 'APP456',
      name: 'Bananas',
      mainUnit: {unit: 'box', price: 12.03},
      anotherUnits: [{unit: 'kg', price: 2.03}],
      availability: 'Out of Stock'
    },
  ]
};

export const CatalogReducer = createReducer(
  initialState,
  on(CatalogActions.addNewProduct, (state, {product}) => {
    return{ ...state, products: [...state.products, product]}
  }),
  on(CatalogActions.deleteProduct, (state, {product}) => {
    return{ ...state, products: state.products.filter(data => data != product)}
  })
);

export const defaultCatalogSelector = createFeatureSelector<Catalog>('catalogReducer');
export const catalogProductsSelector = createSelector(defaultCatalogSelector, state => state.products);
