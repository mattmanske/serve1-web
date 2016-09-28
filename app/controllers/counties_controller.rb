class CountiesController < ApplicationController
  respond_to :json, only: [:index]

  has_scope :state

  # GET /counties
  def index
    @counties = apply_scopes(County).all.order(:name)
    render :json => select_format(@counties)
  end
end
