class MunicipalitiesController < ApplicationController
  respond_to :json, only: [:index]

  has_scope :county

  # GET /municipalities
  def index
    @municipalities = apply_scopes(Municipality).all.order(:name)
    render :json => select_format(@municipalities, :id, :title)
  end
end
