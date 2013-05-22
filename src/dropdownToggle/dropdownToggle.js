/*
 * dropdownToggle - Provides dropdown menu functionality in place of bootstrap js
 * @restrict class or attribute
 * @example:
   <li class="dropdown">
     <a class="dropdown-toggle">My Dropdown Menu</a>
     <ul class="dropdown-menu">
       <li ng-repeat="choice in dropChoices">
         <a ng-href="{{choice.href}}">{{choice.text}}</a>
       </li>
     </ul>
   </li>
 */

angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle',
  ['$document', '$location', function ($document, $location) {
  var openElement = null,
      closeMenu = angular.noop;
  return {
    restrict: 'CA',
    link: function (scope, element) {
      scope.$watch('$location.path', function () {
        closeMenu();
      });
      var parent;
      element.bind('click', function (event) {
        if (!parent) {
          parent = element.parent();
          parent.bind('click', function (e) {
            closeMenu(e);
          });
        }
        event.preventDefault();
        event.stopPropagation();
        var elementWasOpen = (element === openElement);
        if (!!openElement) {
          closeMenu();
        }
        if (!elementWasOpen) {
          parent.addClass('open');
          openElement = element;
          closeMenu = function (event) {
            if (event) {
              event.preventDefault();
              event.stopPropagation();
            }
            $document.unbind('click', closeMenu);
            parent.removeClass('open');
            closeMenu = angular.noop;
            openElement = null;
          };
          $document.bind('click', closeMenu);
        }
      });
    }
  };
}]);
