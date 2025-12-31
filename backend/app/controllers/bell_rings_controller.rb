class BellRingsController < ApplicationController
  def index
    render json: { count: BellRing.count }
  end

  def create
    bell_ring = BellRing.create!
    render json: bell_ring, status: :created
  end
end
