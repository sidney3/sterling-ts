import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { get, set } from 'lodash-es';
import {
  CommonDrawerView,
  GraphDrawerView,
  MainView,
  ScriptDrawerView,
  TableDrawerView,
  UiState
} from './ui';

type DraftState = WritableDraft<UiState>;

/**
 * Set the main UI view (graph/table/script)
 */
function mainViewChanged(state: UiState, action: PayloadAction<MainView>) {
  state.mainView = action.payload;
}

/**
 * Display a common drawer view (evaluator/log) or hide the drawer.
 */
function commonDrawerViewChanged(
  state: UiState,
  action: PayloadAction<CommonDrawerView>
) {
  const view = action.payload;
  switch (state.mainView) {
    case 'GraphView':
      state.graphViewDrawer = view === state.graphViewDrawer ? null : view;
      break;
    case 'TableView':
      state.tableViewDrawer = view === state.tableViewDrawer ? null : view;
      break;
    case 'ScriptView':
      state.scriptViewDrawer = view === state.scriptViewDrawer ? null : view;
      break;
  }
}

function graphDrawerThemeRelationToggled(
  state: DraftState,
  action: PayloadAction<{ datumId: string; relation: string }>
) {
  const { datumId, relation } = action.payload;
  const path = ['graphDrawerThemeById', datumId, 'expandedRelations', relation];
  const current = get(state, path);
  set(state, path, !current);
}

function graphDrawerThemeTypeToggled(
  state: DraftState,
  action: PayloadAction<{ datumId: string; type: string }>
) {
  const { datumId, type } = action.payload;
  const path = ['graphDrawerThemeById', datumId, 'expandedTypes', type];
  const current = get(state, path);
  set(state, path, !current);
}

/**
 * Display a graph drawer view or hide the drawer.
 */
function graphDrawerViewChanged(
  state: WritableDraft<UiState>,
  action: PayloadAction<GraphDrawerView>
) {
  const view = action.payload;
  state.graphViewDrawer = view === state.graphViewDrawer ? null : view;
}

/**
 * Display a table drawer view or hide the drawer.
 */
function tableDrawerViewChanged(
  state: UiState,
  action: PayloadAction<TableDrawerView>
) {
  const view = action.payload;
  state.tableViewDrawer = view === state.tableViewDrawer ? null : view;
}

/**
 * Display a script drawer view or hide the drawer.
 */
function scriptDrawerViewChanged(
  state: UiState,
  action: PayloadAction<ScriptDrawerView>
) {
  const view = action.payload;
  state.scriptViewDrawer = view === state.scriptViewDrawer ? null : view;
}

export default {
  mainViewChanged,
  commonDrawerViewChanged,
  graphDrawerViewChanged,
  graphDrawerThemeRelationToggled,
  graphDrawerThemeTypeToggled,
  tableDrawerViewChanged,
  scriptDrawerViewChanged
};
