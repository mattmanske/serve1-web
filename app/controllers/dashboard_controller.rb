class DashboardController < ApplicationController

  def index
    @case_count    = Case.count
    @job_count     = Job.count
    @service_count = Service.count
    @client_count  = Client.count
  end

  def fill_data
    DataFill.new().fill_tenant
    redirect_to organization_root_path
  end

  def clear_data
    DataFill.new().clear_tenant
    redirect_to organization_root_path
  end
end
