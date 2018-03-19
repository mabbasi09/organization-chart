module Api::V1
    class EmployeeController < ApplicationController
        def index
            @employees = Employee.all
            render json: @employees
        end
    end
end