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
            render json: {message: "working!"}
            # employee = Employee.new(employee_params)
        end

        def employee_params
            params.permit(:first_name, :last_name, :title, :manager_id)
        end
    end
end