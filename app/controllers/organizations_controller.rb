class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:edit, :update]

  # GET /organization/edit
  def edit
    form_repsonse(form_props)
  end

  # PATCH/PUT /organization
  def update
    if @organization.update(organization_params)
      render json: { resource: @organization, redirect: organization_root_path() }
    else
      render json: { organization: @organization.errors }, status: :unprocessable_entity
    end
  end

private

  def set_organization
    @organization = current_user.organization
  end

  def organization_params
    params.require(:organization).permit(:name, :state_id, :county_id, :address, :phone)
  end

  def form_props
    states   = select_format State.all.order(:name)
    counties = select_format County.where(state: 60).order(:name)

    {
      :type     => 'organization',
      :resource => @organization,
      :action   => organization_path(),
      :selections => {
        :states   => states,
        :counties => counties
      }
    }
  end
end
