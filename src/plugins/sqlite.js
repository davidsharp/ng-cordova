// install   :      cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
// link      :      https://github.com/brodysoft/Cordova-SQLitePlugin/blob/master/README.md

angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', function ($q) {

    return  {
      openDB: function (dbObject) {
        return  window.sqlitePlugin.openDatabase(dbObject);
      },

      execute: function (db, query, binding) {
        var q = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {
              q.resolve(result);
            },
            function (transaction, error) {
              q.reject(error);
            });
        });
        return q.promise;
      },

      nestedExecute: function (db, query1, query2, binding1, binding2) {
        var q = $q.defer();

        db.transaction(function (tx) {
            tx.executeSql(query1, binding1, function (tx, result) {
              q.resolve(result);
              tx.executeSql(query2, binding2, function (tx, res) {
                q.resolve(res);
              })
            })
          },
          function (transaction, error) {
            q.reject(error);
          });

        return q.promise;
      }

      // more methods here
    }
  }]);
