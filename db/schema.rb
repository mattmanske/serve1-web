# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160912215738) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "affidavits", force: :cascade do |t|
    t.integer  "service_id"
    t.integer  "state_id",   null: false
    t.string   "court",      null: false
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "affidavits", ["service_id"], name: "index_affidavits_on_service_id", using: :btree

  create_table "attachments", force: :cascade do |t|
    t.integer  "service_id"
    t.string   "url",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "attachments", ["service_id"], name: "index_attachments_on_service_id", using: :btree

  create_table "cases", force: :cascade do |t|
    t.string   "key",                               null: false
    t.integer  "client_id"
    t.integer  "client_contact_id"
    t.integer  "state_id",                          null: false
    t.integer  "county_id",                         null: false
    t.integer  "court_type",                        null: false
    t.string   "plantiff",                          null: false
    t.boolean  "plantiff_et_al",    default: false, null: false
    t.string   "defendant",                         null: false
    t.boolean  "defendant_et_al",   default: false, null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  add_index "cases", ["client_contact_id"], name: "index_cases_on_client_contact_id", using: :btree
  add_index "cases", ["client_id"], name: "index_cases_on_client_id", using: :btree
  add_index "cases", ["key"], name: "index_cases_on_key", unique: true, using: :btree

  create_table "client_contacts", force: :cascade do |t|
    t.integer  "client_id"
    t.string   "first_name", default: "", null: false
    t.string   "last_name",  default: "", null: false
    t.string   "email",                   null: false
    t.string   "address"
    t.string   "phone"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "client_contacts", ["client_id"], name: "index_client_contacts_on_client_id", using: :btree

  create_table "clients", force: :cascade do |t|
    t.string   "key",        null: false
    t.string   "name",       null: false
    t.string   "email",      null: false
    t.string   "address"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "clients", ["key"], name: "index_clients_on_key", unique: true, using: :btree

  create_table "counties", force: :cascade do |t|
    t.string   "name"
    t.integer  "state_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "counties", ["name", "state_id"], name: "index_counties_on_name_and_state_id", unique: true, using: :btree
  add_index "counties", ["state_id"], name: "index_counties_on_state_id", using: :btree

  create_table "documents", force: :cascade do |t|
    t.integer  "service_id"
    t.integer  "document_type", default: 0, null: false
    t.string   "title",                     null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "documents", ["service_id"], name: "index_documents_on_service_id", using: :btree

  create_table "jobs", force: :cascade do |t|
    t.string   "key",                       null: false
    t.integer  "case_id"
    t.integer  "status",        default: 0, null: false
    t.datetime "date_sent"
    t.datetime "date_received"
    t.text     "notes"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "amount_cents"
  end

  add_index "jobs", ["case_id"], name: "index_jobs_on_case_id", using: :btree
  add_index "jobs", ["key", "case_id"], name: "index_jobs_on_key_and_case_id", unique: true, using: :btree

  create_table "municipalities", force: :cascade do |t|
    t.string   "name"
    t.string   "category"
    t.integer  "county_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "municipalities", ["county_id"], name: "index_municipalities_on_county_id", using: :btree
  add_index "municipalities", ["name", "county_id", "category"], name: "index_municipalities_on_name_and_county_id_and_category", unique: true, using: :btree

  create_table "organization_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "role",       default: 0, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "organization_users", ["user_id"], name: "index_organization_users_on_user_id", unique: true, using: :btree

  create_table "organizations", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "subdomain",  null: false
    t.string   "address"
    t.string   "phone"
    t.string   "email"
    t.integer  "state_id"
    t.integer  "county_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "organizations", ["county_id"], name: "index_organizations_on_county_id", using: :btree
  add_index "organizations", ["state_id"], name: "index_organizations_on_state_id", using: :btree

  create_table "parties", force: :cascade do |t|
    t.string   "name",            null: false
    t.string   "address"
    t.integer  "state_id",        null: false
    t.integer  "county_id",       null: false
    t.integer  "municipality_id", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "services", force: :cascade do |t|
    t.integer  "job_id"
    t.integer  "party_id"
    t.integer  "status",             default: 0, null: false
    t.integer  "service_type"
    t.string   "person_name"
    t.string   "person_title"
    t.string   "person_capacity"
    t.string   "person_description"
    t.datetime "service_date"
    t.integer  "attempts"
    t.integer  "mileage"
    t.text     "notes"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "payment_cents"
  end

  add_index "services", ["job_id"], name: "index_services_on_job_id", using: :btree
  add_index "services", ["party_id"], name: "index_services_on_party_id", using: :btree

  create_table "states", force: :cascade do |t|
    t.string   "name"
    t.string   "two_digit_code", limit: 2
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "first_name",             default: "", null: false
    t.string   "last_name",              default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.integer  "organization_id"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["organization_id"], name: "index_users_on_organization_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "affidavits", "services"
  add_foreign_key "attachments", "services"
  add_foreign_key "cases", "client_contacts"
  add_foreign_key "cases", "clients"
  add_foreign_key "client_contacts", "clients"
  add_foreign_key "counties", "states"
  add_foreign_key "documents", "services"
  add_foreign_key "jobs", "cases"
  add_foreign_key "municipalities", "counties"
  add_foreign_key "organizations", "counties"
  add_foreign_key "organizations", "states"
  add_foreign_key "services", "jobs"
  add_foreign_key "services", "parties"
  add_foreign_key "users", "organizations"
end
