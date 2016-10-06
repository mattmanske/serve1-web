class MunicipalitiesController < ApplicationController
  has_scope :county_id

  # GET /counties/:county_id/municipalities
  def index
    @municipalities = apply_scopes(Municipality).all.order(:name)
    render :json => select_format(@municipalities, :id, :title)
  end
end
