import { createAction, props } from '@ngrx/store';
import { Catalog, IProduct, IUnit } from '../interfaces/catalog.interfaces';


const addNewProduct = createAction('[Catalog] Add New Product', props<{product: IProduct}>());
const deleteProduct = createAction('[Catalog] Delete Product', props<{product: IProduct}>());
const replaceCatalog = createAction( '[Catalog] Replace Catalog', props<{catalog: Catalog}>());
const addUnit = createAction('[Catalog] Add Unit', props<{unit: IUnit }>());

export const CatalogActions = {
  addNewProduct,
  deleteProduct,
  replaceCatalog,
  addUnit
};
