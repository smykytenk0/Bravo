import { createAction, props } from '@ngrx/store';
import { Catalog, IProduct } from '../interfaces/catalog.interfaces';


const addNewProduct = createAction('[Catalog] Add New Product', props<{product: IProduct}>());
const deleteProduct = createAction('[Catalog] Delete Product', props<{product: IProduct}>());
const replaceCatalog = createAction( '[Catalog] Replace Catalog', props<{catalog: Catalog}>());

export const CatalogActions = {
  addNewProduct,
  deleteProduct,
  replaceCatalog
};
