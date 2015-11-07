(function(angular) {
    var app = angular.module('lifeApp', []);


    // Controller for the Game of Life app
    app.controller("Life", function($scope, $timeout) {

        // Constructor for the cell object
        // represented by each gray square div
        function Cell(isAlive,numNghb) {
            this.isAlive = isAlive;
            this.numNghb = numNghb;
            //this.lifeClass = 'dead-cell';
            this.lifeClass = this.isAlive ? 'living-cell':'dead-cell';
        }


        // Neccessary to initiate 2D array
        // for our grid of cells
        function createCells(rows) {
            var arr = [];
            for (i=0;i<rows;i++)
                arr[i] = [];

            return arr;
        }

        // Shorthand for number of rows
        // and columns to make easy changes
        // if neccessary
        $scope.numRows = 51;
        $scope.numColumns = 59;

        // Initializer for the 2D array
        // of cells
        $scope.cells = createCells($scope.numRows);

        // To be used in preserving current
        // generation of cells
        var nextGen = createCells($scope.numRows);


        // This is the initializer
        // for the current generation of cells
        for (i=0;i<$scope.numRows;i++)
            for (j=0;j<$scope.numColumns;j++)
                $scope.cells[i][j] = new Cell(false,0);

        // This is the initializer
        // for the next generation of cells
        for (i=0;i<$scope.numRows;i++)
            for (j=0;j<$scope.numColumns;j++)
                nextGen[i][j] = new Cell(false,0);


        // Start with a random set of living cells
        for (i=0;i<$scope.numRows;i++) {
            for (j=0;j<$scope.numColumns;j++) {
                if (Math.random()>=0.5) {
                    $scope.cells[i][j].isAlive = true;
                } else {
                    $scope.cells[i][j].isAlive = false;
                }
            }
        }


        $scope.playSimulation = function () {
            // Here the function goes through each cell
            // and checks that cell's neighbors (diagonals inclusive)
            // Note how if the check is asking for a cell out
            // of bounds, it checks the cell on the opposite wall
            for (i=0;i<$scope.numRows;i++) {
                for (j=0;j<$scope.numColumns;j++) {
                    var tempNghb = 0;
                    if (i-1>=0){
                        if ($scope.cells[i-1][j].isAlive)
                            tempNghb++;
                        if (j+1<$scope.numColumns) {
                            if ($scope.cells[i-1][j+1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[i-1][0].isAlive) {
                                tempNghb++;
                            }
                        }
                    } else {
                        if ($scope.cells[$scope.numRows-1][j].isAlive) {
                            tempNghb++;
                        }
                        if (j+1<$scope.numColumns) {
                            if ($scope.cells[$scope.numRows-1][j+1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[$scope.numRows-1][0].isAlive) {
                                tempNghb++;
                            }
                        }
                    }
                    if (j+1<$scope.numColumns) {
                        if ($scope.cells[i][j+1].isAlive) {
                            tempNghb++;
                        }
                        if (i+1<$scope.numRows) {
                            if ($scope.cells[i+1][j+1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[0][j+1].isAlive) {
                                tempNghb++;
                            }
                        }
                    } else {
                        if ($scope.cells[i][0].isAlive) {
                            tempNghb++;
                        }
                        if (i+1<$scope.numRows) {
                            if ($scope.cells[i+1][0].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[0][0].isAlive) {
                                tempNghb++;
                            }
                        }
                    }
                    if (i+1<$scope.numRows) {
                        if ($scope.cells[i+1][j].isAlive) {
                            tempNghb++;
                        }
                        if (j-1>=0) {
                            if ($scope.cells[i+1][j-1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[i+1][$scope.numColumns-1].isAlive) {
                                tempNghb++;
                            }
                        }
                    } else {
                        if ($scope.cells[0][j].isAlive) {
                            tempNghb++;
                        }
                        if (j-1>=0) {
                            if ($scope.cells[0][j-1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[0][$scope.numColumns-1].isAlive) {
                                tempNghb++;
                            }
                        }
                    }
                    if (j-1>=0) {
                        if ($scope.cells[i][j-1].isAlive) {
                            tempNghb++;
                        }
                        if (i-1>=0) {
                            if ($scope.cells[i-1][j-1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[$scope.numRows-1][j-1].isAlive) {
                                tempNghb++;
                            }
                        }
                    } else {
                        if ($scope.cells[i][$scope.numColumns-1].isAlive) {
                            tempNghb++;
                        }
                        if (i-1>=0) {
                            if ($scope.cells[i-1][$scope.numColumns-1].isAlive) {
                                tempNghb++;
                            }
                        } else {
                            if ($scope.cells[$scope.numRows-1][$scope.numColumns-1].isAlive) {
                                tempNghb++;
                            }
                        }
                    }
                    $scope.cells[i][j].numNghb = tempNghb;
                }
            }

            // Checks the life-state of the current generation
            // against the rules to determine the life-state of
            // the next generation, using number of neighbors
            for (i=0;i<$scope.numRows;i++) {
                for (j=0;j<$scope.numColumns;j++) {
                    if ($scope.cells[i][j].isAlive) {
                        if ($scope.cells[i][j].numNghb === 2 || $scope.cells[i][j].numNghb === 3) {
                            nextGen[i][j].isAlive = true;
                            nextGen[i][j].lifeClass = 'living-cell';
                        } else {
                            nextGen[i][j].isAlive = false;
                            nextGen[i][j].lifeClass = 'dead-cell';
                        }
                    } else {
                        if ($scope.cells[i][j].numNghb === 3) {
                            nextGen[i][j].isAlive = true;
                            nextGen[i][j].lifeClass = 'living-cell';
                        }
                    }
                }
            }

            // Assigns the life-states for the view from
            // the "next generation" to the "current generation"
            // Updating after the neighbor count prevents the function
            // from losing the data on the current generation
            for (i=0;i<$scope.numRows;i++) {
                for(j=0;j<$scope.numColumns;j++) {
                    $scope.cells[i][j].isAlive = nextGen[i][j].isAlive;
                    $scope.cells[i][j].lifeClass = nextGen[i][j].lifeClass;
                }
            }
        }

        var stop;
        $scope.play = false;

        // Using $timeout and "stop" this function
        // calls our simulation function until the
        // "$scope.play" is false.
        $scope.playLife = function() {
            stop = $timeout(function() {
                if ($scope.play === true) {
                    $scope.playSimulation();
                    $scope.playLife();
                } else {
                    $timeout.cancel(stop);
                }

            }, 500);
        };

        // Bound to the "Play/Pause" button and
        // changes the state of "$scope.play" each
        // time the button is clicked
        $scope.playLifeButton = function() {
            $scope.play = !$scope.play;
            $scope.playLife();
        }

    })


    app.directive('change', function () {
        return function (element,scope,attrs) {
            element.bind(true, function() {
                $scope.numRows=attrs.change;
            })
        }
    })
}(angular))
