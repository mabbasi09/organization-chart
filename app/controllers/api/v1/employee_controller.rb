module Api::V1
    class EmployeeController < ApplicationController
        def index
            #data to send to client
            @results = []
            #start at some root
            @root = Employee.find_by title: 'CEO'
            #convert to hash table, add key, and store in results
            @root = @root.attributes
            @root["direct_reports"] = []

            def getBelow(root=@root)
                #check for reporting employees
                @reports = Employee.where("manager_id = ?", root["id"])
                
                if @reports.blank?
                    root["direct_reports"] = []
                    return root
                else
                    @reports = @reports.map(&:attributes)
                    root["direct_reports"] = @reports
                    @reports.each do |person|
                        person["direct_reports"] = []
                        getBelow(person)
                    end
                    return root
                end
            end

            @results[0] = getBelow(@root)
            render json: {status: 'SUCCESS', message: 'Found employees', data: @results}, status: :ok
        end

        def create
            @newEmployee = Employee.new(employee_params)

            if @newEmployee.save
                render json: {status: 'SUCCESS', message: 'Created new employee', data: @newEmployee}, status: :ok
            else
                render json: {status: 'ERROR', message: 'Employee not saved', data: @newEmployee.errors}
            end
        end

        def destroy
            @deleteEmployee = Employee.find(params[:id])
            @deleteEmployee.destroy()
            render json: {status: 'SUCCESS', message: 'Deleted employee', data: @deleteEmployee}, status: :ok
        end

        def update
            @updateEmployee = Employee.find(params[:id])
            if @updateEmployee.update_attributes(employee_params)
                render json: {status: 'SUCCESS', message: 'Updated employee', data: @updateEmployee}, status: :ok
            else
                render json: {status: 'ERROR', message: 'Unable to update employee', data: @updateEmployee}
            end
        end

        private

        def employee_params
            params.permit(:first_name, :last_name, :title, :manager_id)
        end
    end
end