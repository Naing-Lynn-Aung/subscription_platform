require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /api/v1/users" do
    let(:base_params) do
      {
        user: {
          name: "testing",
          email: "test@gmail.com",
          password: "password",
          password_confirmation: "password"
        }
      }
    end

    it "creates a new user with valid parameters" do
      expect {
        post "/api/v1/users", params: base_params
      }.to change(User, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    context "with invalid parameters" do
      it "create a new user with missing name" do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].except(:name) }
        }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it "create a new user with missing email" do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].except(:email) }
        }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it "create a new user with invalid email" do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].merge(email: "test") }
        }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it "create a new user with existing email" do
        User.create!(base_params[:user])
        expect {
          post "/api/v1/users", params: base_params
        }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it "create a new user with missing password" do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].except(:password) }
      }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it 'create a new user with short password' do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].merge(password: "aaa") }
      }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it "create a new user with missing password_confirmation" do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].merge(password_confirmation: "") }
      }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it "create a new user with non-matching password and password_confirmation" do
        expect {
          post "/api/v1/users", params: { user: base_params[:user].merge(password_confirmation: "confirmation") }
      }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
