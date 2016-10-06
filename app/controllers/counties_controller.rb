class CountiesController < ApplicationController
  has_scope :state_id

  # GET /states/:state_id/counties
  def index
    @counties = apply_scopes(County).all.order(:name)
    render :json => select_format(@counties)
  end
end
