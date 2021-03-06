'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _actions, _ACTION_HANDLERS_OBJ, _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ### Действия и типы действий в терминах redux
 *
 * &copy; Evgeniy Malyarov http://www.oknosoft.ru 2014-2016
 * @module actions.js
 *
 * Created 05.09.2016
 */

// ------------------------------------
// Action types - имена типов действий
// ------------------------------------

var OBJ_ADD = 'OBJ_ADD'; // Команда создать объекта
var OBJ_ADD_ROW = 'OBJ_ADD_ROW'; // Команда добавить строку в табчасть объекта
var OBJ_DEL_ROW = 'OBJ_DEL_ROW'; // Команда удалить строку табчасти объекта
var OBJ_EDIT = 'OBJ_EDIT'; // Команда открыть форму редактирования объекта
var OBJ_REVERT = 'OBJ_REVERT'; // Команда вернуть объект в состояние до редактирования (перечитать из базы данных)
var OBJ_SAVE = 'OBJ_SAVE'; // Команда записать изменённый объект (пометка удаления, проведение и отмена проведения - это так же, запись)
var OBJ_CHANGE = 'OBJ_CHANGE'; // Записан изменённый объект (по команде интерфейса или в результате репликации)
var OBJ_VALUE_CHANGE = 'OBJ_VALUE_CHANGE'; // Изменён реквизит шапки или строки табчасти


// ------------------------------------
// Actions - функции - генераторы действий. Они передаются в диспетчер redux
// ------------------------------------


function obj_add(class_name) {
	return {
		type: OBJ_ADD,
		payload: { class_name: class_name }
	};
}

function obj_add_row(class_name, ref, tabular, proto) {
	return {
		type: OBJ_ADD_ROW,
		payload: {
			class_name: class_name,
			ref: ref,
			tabular: tabular,
			proto: proto
		}
	};
}

/**
 * ### Удаляет строку, не оставляет следов в истории
 * @param class_name
 * @param ref
 * @param tabular
 * @param index
 * @return {function(): Promise.<T>}
 */
function obj_del_row(class_name, ref, tabular, index) {
	// удаляем строку

	// возвращаем thunk
	return function () {
		return Promise.resolve();
	};
}

/**
 * ### Генерирует событие маршрутизации на форму объекта
 * @param class_name
 * @param ref
 * @param frm
 * @return {{type: string, payload: {class_name: *, ref: *, frm: *}}}
 */
function obj_edit(class_name, ref, frm) {
	return {
		type: OBJ_EDIT,
		payload: {
			class_name: class_name,
			ref: ref,
			frm: frm
		}
	};
}

function obj_revert(class_name, ref) {
	return function (dispatch, getState) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				dispatch(dispatch({
					type: OBJ_REVERT,
					payload: {
						class_name: class_name,
						ref: ref
					}
				}));
				resolve();
			}, 200);
		});
	};
}

function obj_save(class_name, ref, post, mark_deleted) {
	return function (dispatch, getState) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				dispatch(dispatch({
					type: OBJ_SAVE,
					payload: {
						class_name: class_name,
						ref: ref,
						post: post,
						mark_deleted: mark_deleted
					}
				}));
				resolve();
			}, 200);
		});
	};
}

function obj_post(class_name, ref) {
	return obj_save(class_name, ref, true);
}

function obj_unpost(class_name, ref) {
	return obj_save(class_name, ref, false);
}

function obj_mark_deleted(class_name, ref) {
	return obj_save(class_name, ref, undefined, true);
}

function obj_unmark_deleted(class_name, ref) {
	return obj_save(class_name, ref, undefined, false);
}

function obj_change(class_name, ref) {
	return {
		type: OBJ_CHANGE,
		payload: {
			class_name: class_name,
			ref: ref
		}
	};
}

function obj_value_change(class_name, ref) {
	return function (dispatch, getState) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				dispatch(dispatch({
					type: OBJ_VALUE_CHANGE,
					payload: {
						class_name: class_name,
						ref: ref
					}
				}));
				resolve();
			}, 200);
		});
	};
}

/**
 * ### Действия и типы действий в терминах redux
 *
 * &copy; Evgeniy Malyarov http://www.oknosoft.ru 2014-2016
 * @module actions.js
 *
 * Created 05.09.2016
 */

// ------------------------------------
// Action types - имена типов действий
// ------------------------------------

var META_LOADED = 'META_LOADED'; // Инициализирует параметры и создаёт менеджеры объектов данных

var PRM_CHANGE = 'PRM_CHANGE'; // Изменены глобальные параметры (couch_path, zone и т.д.)


var USER_TRY_LOG_IN = 'USER_TRY_LOG_IN'; // Попытка авторизации
var USER_LOG_IN = 'USER_LOG_IN'; // Подтверждает авторизацию
var USER_DEFINED = 'USER_DEFINED'; // Установить текущего пользователя (авторизация не обязательна)
var USER_LOG_OUT = 'USER_LOG_OUT'; // Попытка завершения синхронизации
var USER_LOG_ERROR = 'USER_LOG_ERROR'; // Ошибка авторизации

var POUCH_DATA_PAGE = 'POUCH_DATA_PAGE'; // Оповещение о загрузке порции локальных данных
var POUCH_LOAD_START = 'POUCH_LOAD_START'; // Оповещение о начале загрузки локальных данных
var POUCH_DATA_LOADED = 'POUCH_DATA_LOADED'; // Оповещение об окончании загрузки локальных данных
var POUCH_DATA_ERROR = 'POUCH_DATA_ERROR'; // Оповещение об ошибке при загрузке локальных данных
var POUCH_NO_DATA = 'POUCH_NO_DATA'; // Оповещение об отсутствии локальных данных (как правило, при первом запуске)

var POUCH_SYNC_START = 'POUCH_SYNC_START'; // Оповещение о начале синхронизации базы doc
var POUCH_SYNC_ERROR = 'POUCH_SYNC_ERROR'; // Оповещение об ошибке репликации - не означает окончания репликации - просто информирует об ошибке
var POUCH_SYNC_DATA = 'POUCH_SYNC_DATA'; // Прибежали изменения с сервера или мы отправили данные на сервер


// ------------------------------------
// Actions - функции - генераторы действий. Они передаются в диспетчер redux
// ------------------------------------

function meta_loaded($p) {

	return {
		type: META_LOADED,
		payload: $p
	};
}

function prm_change(prms) {

	return {
		type: PRM_CHANGE,
		payload: prms
	};
}

/**
 * ### После загрузки локальных данных
 * если разрешено сохранение пароля или демо-режим, выполняем попытку авторизации
 * @param page
 * @return {{type: string, payload: *}}
 */
function _pouch_data_loaded(page) {

	return function (dispatch, getState) {

		// First dispatch: the app state is updated to inform
		// that the API call is starting.

		dispatch({
			type: POUCH_DATA_LOADED,
			payload: page
		});

		// если вход еще не выполнен...
		var state = getState();
		if (!state.meta.user.logged_in) {

			setTimeout(function () {

				// получаем имя сохраненного или гостевого пользователя
				var name = state.meta.$p.wsql.get_user_param('user_name');
				var password = state.meta.$p.wsql.get_user_param('user_pwd');

				if (!name && state.meta.$p.job_prm.zone_demo == state.meta.$p.wsql.get_user_param('zone') && state.meta.$p.job_prm.guests.length) {
					name = state.meta.$p.job_prm.guests[0].name;
				}

				// устанавливаем текущего пользователя
				if (name) dispatch(user_defined(name));

				// если разрешено сохранение пароля или гостевая зона...
				if (name && password && state.meta.$p.wsql.get_user_param('enable_save_pwd')) {
					dispatch(user_try_log_in(state.meta.$p.adapters.pouch, name, $p.aes.Ctr.decrypt(password)));
					return;
				}

				if (name && state.meta.$p.job_prm.zone_demo == state.meta.$p.wsql.get_user_param('zone')) {
					dispatch(user_try_log_in(state.meta.$p.adapters.pouch, name, $p.aes.Ctr.decrypt(state.meta.$p.job_prm.guests[0].password)));
				}
			}, 10);
		}
	};
}

var sync_data_indicator;
function _pouch_sync_data(dbid, change) {

	// Thunk middleware знает, как обращаться с функциями.
	// Он передает метод действия в качестве аргумента функции,
	// т.о, это позволяет отправить действие самостоятельно.

	return function (dispatch, getState) {

		// First dispatch: the app state is updated to inform
		// that the API call is starting.

		dispatch({
			type: POUCH_SYNC_DATA,
			payload: {
				dbid: dbid,
				change: change
			}
		});

		if (sync_data_indicator) {
			clearTimeout(sync_data_indicator);
		}

		sync_data_indicator = setTimeout(function () {

			sync_data_indicator = 0;

			dispatch({
				type: POUCH_SYNC_DATA,
				payload: false
			});
		}, 3000);
	};
}

function _pouch_data_page(page) {
	return {
		type: POUCH_DATA_PAGE,
		payload: page
	};
}

function _pouch_load_start(page) {
	return {
		type: POUCH_LOAD_START,
		payload: page
	};
}

function _pouch_sync_start() {
	return { type: POUCH_SYNC_START };
}

function _pouch_sync_error(dbid, err) {
	return {
		type: POUCH_SYNC_ERROR,
		payload: {
			dbid: dbid,
			err: err
		}
	};
}

function _pouch_data_error(dbid, err) {
	return {
		type: POUCH_DATA_ERROR,
		payload: {
			dbid: dbid,
			err: err
		}
	};
}

function _pouch_no_data(dbid, err) {
	return {
		type: POUCH_NO_DATA,
		payload: {
			dbid: dbid,
			err: err
		}
	};
}

function user_defined(name) {

	return {
		type: USER_DEFINED,
		payload: name
	};
}

/**
 * ### Пользователь авторизован
 * @param name
 * @return {{type: string, payload: *}}
 */
function _user_log_in(name) {
	return {
		type: USER_LOG_IN,
		payload: name
	};
}

function user_try_log_in(adapter, name, password) {

	// Thunk middleware знает, как обращаться с функциями.
	// Он передает метод действия в качестве аргумента функции,
	// т.о, это позволяет отправить действие самостоятельно.

	return function (dispatch, getState) {

		// First dispatch: the app state is updated to inform
		// that the API call is starting.

		dispatch({
			type: USER_TRY_LOG_IN,
			payload: { name: name, password: password }
		});

		// The function called by the thunk middleware can return a value,
		// that is passed on as the return value of the dispatch method.

		// In this case, we return a promise to wait for.
		// This is not required by thunk middleware, but it is convenient for us.

		return adapter.log_in(name, password);
		// .then(dispatch(user_log_in(name)))

		// In a real world app, you also want to
		// catch any error in the network call.
	};
}

function _user_log_out() {
	return {
		type: USER_LOG_OUT
	};
}

function user_log_error() {
	return {
		type: USER_LOG_ERROR
	};
}

var actions = (_actions = {}, _defineProperty(_actions, META_LOADED, meta_loaded), _defineProperty(_actions, PRM_CHANGE, prm_change), _defineProperty(_actions, USER_TRY_LOG_IN, user_try_log_in), _defineProperty(_actions, USER_LOG_IN, _user_log_in), _defineProperty(_actions, USER_DEFINED, user_defined), _defineProperty(_actions, USER_LOG_OUT, _user_log_out), _defineProperty(_actions, USER_LOG_ERROR, user_log_error), _defineProperty(_actions, POUCH_DATA_LOADED, _pouch_data_loaded), _defineProperty(_actions, POUCH_DATA_PAGE, _pouch_data_page), _defineProperty(_actions, POUCH_DATA_ERROR, _pouch_data_error), _defineProperty(_actions, POUCH_LOAD_START, _pouch_load_start), _defineProperty(_actions, POUCH_NO_DATA, _pouch_no_data), _defineProperty(_actions, OBJ_ADD, obj_add), _defineProperty(_actions, OBJ_ADD_ROW, obj_add_row), _defineProperty(_actions, OBJ_DEL_ROW, obj_del_row), _defineProperty(_actions, OBJ_EDIT, obj_edit), _defineProperty(_actions, OBJ_REVERT, obj_revert), _defineProperty(_actions, OBJ_SAVE, obj_save), _defineProperty(_actions, OBJ_CHANGE, obj_change), _defineProperty(_actions, OBJ_VALUE_CHANGE, obj_value_change), _defineProperty(_actions, 'obj_post', obj_post), _defineProperty(_actions, 'obj_unpost', obj_unpost), _defineProperty(_actions, 'obj_mark_deleted', obj_mark_deleted), _defineProperty(_actions, 'obj_unmark_deleted', obj_unmark_deleted), _actions);

/**
 * Action Handlers - обработчики событий - вызываются из корневого редюсера
 */
var ACTION_HANDLERS_OBJ = (_ACTION_HANDLERS_OBJ = {}, _defineProperty(_ACTION_HANDLERS_OBJ, OBJ_ADD, function (state, action) {
	return state;
}), _defineProperty(_ACTION_HANDLERS_OBJ, OBJ_CHANGE, function (state, action) {
	return Object.assign({}, state, { obj_change: action.payload });
}), _ACTION_HANDLERS_OBJ);

/**
 * Action Handlers - обработчики событий - вызываются из корневого редюсера
 */
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, META_LOADED, function (state, action) {
	return Object.assign({}, state, { $p: action.payload });
}), _defineProperty(_ACTION_HANDLERS, PRM_CHANGE, function (state, action) {
	return state;
}), _defineProperty(_ACTION_HANDLERS, POUCH_DATA_LOADED, function (state, action) {
	return Object.assign({}, state, { data_loaded: true, fetch_local: false });
}), _defineProperty(_ACTION_HANDLERS, POUCH_DATA_PAGE, function (state, action) {
	return Object.assign({}, state, { page: action.payload });
}), _defineProperty(_ACTION_HANDLERS, POUCH_DATA_ERROR, function (state, action) {
	return Object.assign({}, state, { err: action.payload, fetch_local: false });
}), _defineProperty(_ACTION_HANDLERS, POUCH_LOAD_START, function (state, action) {
	return Object.assign({}, state, { data_empty: false, fetch_local: true });
}), _defineProperty(_ACTION_HANDLERS, POUCH_NO_DATA, function (state, action) {
	return Object.assign({}, state, { data_empty: true, fetch_local: false });
}), _defineProperty(_ACTION_HANDLERS, POUCH_SYNC_START, function (state, action) {
	return Object.assign({}, state, { sync_started: true });
}), _defineProperty(_ACTION_HANDLERS, POUCH_SYNC_DATA, function (state, action) {
	return Object.assign({}, state, { fetch_remote: action.payload ? true : false });
}), _defineProperty(_ACTION_HANDLERS, USER_DEFINED, function (state, action) {
	return Object.assign({}, state, { user: {
			name: action.payload,
			logged_in: state.user.logged_in
		} });
}), _defineProperty(_ACTION_HANDLERS, USER_LOG_IN, function (state, action) {
	return Object.assign({}, state, { user: {
			name: action.payload,
			logged_in: true
		} });
}), _defineProperty(_ACTION_HANDLERS, USER_TRY_LOG_IN, function (state, action) {
	return Object.assign({}, state, { user: {
			name: action.payload.name,
			logged_in: state.user.logged_in
		} });
}), _defineProperty(_ACTION_HANDLERS, USER_LOG_OUT, function (state, action) {
	return Object.assign({}, state, {
		user: {
			name: state.user.name,
			logged_in: false
		},
		sync_started: false
	});
}), _defineProperty(_ACTION_HANDLERS, USER_LOG_ERROR, function (state, action) {
	return Object.assign({}, state, {
		user: {
			name: state.user.name,
			logged_in: false
		},
		sync_started: false
	});
}), _ACTION_HANDLERS);

/**
 * ### Reducer
 * Он создаёт область в хранилище состояния и несёт ответственность за изменения этой области
 */
var initialState = {
	meta_loaded: false,
	data_loaded: false,
	data_empty: true,
	sync_started: false,
	fetch_local: false,
	fetch_remote: false,
	user: {
		name: "",
		logged_in: false
	}
};
function rx_reducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];


	var handler = ACTION_HANDLERS[action.type];

	if (!handler) handler = ACTION_HANDLERS_OBJ[action.type];

	if (handler) {
		console.log(action);
		return handler(state, action);
	} else return state;
}

/**
 * Подключает диспетчеризацию событий redux к pouchdb
 */
function rx_events(store) {

	this.adapters.pouch.on({

		user_log_in: function user_log_in(name) {
			store.dispatch(_user_log_in(name));
		},

		user_log_out: function user_log_out() {
			store.dispatch(_user_log_out());
		},

		pouch_data_page: function pouch_data_page(page) {
			store.dispatch(_pouch_data_page(page));
		},

		pouch_data_loaded: function pouch_data_loaded(page) {
			store.dispatch(_pouch_data_loaded(page));
		},

		pouch_data_error: function pouch_data_error(dbid, err) {
			store.dispatch(_pouch_data_error(dbid, err));
		},

		pouch_load_start: function pouch_load_start(page) {
			store.dispatch(_pouch_load_start(page));
		},

		pouch_no_data: function pouch_no_data(dbid, err) {
			store.dispatch(_pouch_no_data(dbid, err));
		},

		pouch_sync_start: function pouch_sync_start() {
			store.dispatch(_pouch_sync_start());
		},

		pouch_sync_data: function pouch_sync_data(dbid, change) {
			store.dispatch(_pouch_sync_data(dbid, change));
		},

		pouch_sync_error: function pouch_sync_error(dbid, err) {
			store.dispatch(_pouch_sync_error(dbid, err));
		}
	});

	this.md.on({
		obj_loaded: function obj_loaded(_obj) {
			store.dispatch(obj_change(_obj._manager.class_name, _obj.ref));
		}
	});
}

/**
 * Экспортируем объект-плагин для модификации metadata.js
 */
var plugin = {
	proto: function proto(constructor) {

		Object.defineProperties(constructor.prototype, {

			rx_actions: {
				value: actions
			},

			rx_reducer: {
				value: rx_reducer
			},

			rx_events: {
				value: rx_events
			}
		});
	},
	constructor: function constructor() {}
};
exports.default = plugin;