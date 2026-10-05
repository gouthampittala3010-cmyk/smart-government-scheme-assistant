import React, { useState, useEffect } from 'react';
import { adminApi, schemeApi } from '../api';
import { 
  ShieldCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Building2, 
  Award, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Layers, 
  Loader2 
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTable, setSearchTable] = useState('');

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState('');
  const [savingScheme, setSavingScheme] = useState(false);

  const initialForm = {
    name: '',
    code: '',
    category: 'Agriculture & Rural',
    ministry: '',
    briefDescription: '',
    benefits: '',
    financialAidAmount: 0,
    level: 'Central',
    applicableState: 'All India',
    minAge: '',
    maxAge: '',
    eligibleGenders: 'All',
    maxAnnualIncome: '',
    eligibleCategories: 'All',
    eligibleOccupations: 'All',
    eligibleEducations: 'All',
    requiresDisability: false,
    requiresMinority: false,
    requiresBpl: false,
    requiresLand: false,
    ruralOnly: false,
    urbanOnly: false,
    requiredDocuments: '',
    applicationProcedure: '',
    officialWebsite: '',
    helplineNumber: '',
    tags: '',
    active: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, schemesRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getAllSchemes(),
      ]);
      setStats(statsRes.data);
      setSchemes(schemesRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData(initialForm);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (scheme) => {
    setIsEditing(true);
    setEditId(scheme.id);
    setFormData({
      ...scheme,
      minAge: scheme.minAge ?? '',
      maxAge: scheme.maxAge ?? '',
      maxAnnualIncome: scheme.maxAnnualIncome ?? '',
      financialAidAmount: scheme.financialAidAmount ?? 0,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete scheme: "${name}"?`)) {
      try {
        await adminApi.deleteScheme(id);
        await loadData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete scheme');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSavingScheme(true);
    setFormError('');

    try {
      const payload = {
        ...formData,
        minAge: formData.minAge !== '' ? parseInt(formData.minAge) : null,
        maxAge: formData.maxAge !== '' ? parseInt(formData.maxAge) : null,
        maxAnnualIncome: formData.maxAnnualIncome !== '' ? parseFloat(formData.maxAnnualIncome) : null,
        financialAidAmount: parseFloat(formData.financialAidAmount) || 0,
      };

      if (isEditing) {
        await adminApi.updateScheme(editId, payload);
      } else {
        await adminApi.createScheme(payload);
      }

      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save scheme. Please check code uniqueness and inputs.');
    } finally {
      setSavingScheme(false);
    }
  };

  const filteredSchemes = schemes.filter((s) => {
    const term = searchTable.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.code.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.ministry.toLowerCase().includes(term)
    );
  });

  if (loading && !stats) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm text-slate-500">Loading administrative portal...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrative Governance & Scheme Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Admin Master Dashboard</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Maintain national scheme registries, update eligibility rules, and view citizen demographic statistics.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Government Scheme</span>
        </button>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Schemes</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.totalSchemes || 0}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
            {stats?.activeSchemes || 0} currently active
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Citizens</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.totalCitizens || 0}</p>
          <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">
            Accounts created on portal
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Citizen Profiles</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.totalProfiles || 0}</p>
          <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">
            Completed eligibility audits
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Sectors Covered</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">
            {stats?.categoryCounts ? Object.keys(stats.categoryCounts).length : 0}
          </p>
          <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">
            Welfare & benefit domains
          </span>
        </div>
      </div>

      {/* Schemes Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table header bar */}
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Registered Schemes Database</h2>
            <p className="text-xs text-slate-500">Manage welfare schemes, benefit ceilings, and eligibility criteria</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search table..."
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              className="input-field pl-9 text-xs py-2"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Scheme Name & Ministry</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Max Financial Aid</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchemes.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-700">{s.code}</td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-bold text-slate-900 truncate">{s.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{s.ministry}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800">
                    {s.financialAidAmount ? `₹${s.financialAidAmount.toLocaleString('en-IN')}` : 'Subsidized / In-Kind'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {s.active ? 'Active' : 'Archived'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                      title="Edit scheme"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id, s.name)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                      title="Delete scheme"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Scheme Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isEditing ? `Edit Scheme: ${formData.code}` : 'Add New Government Scheme'}
                </h3>
                <p className="text-xs text-slate-500">Fill in program parameters and AI eligibility criteria rules</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* General Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider">1. General Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Scheme Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field text-xs"
                      placeholder="e.g. PM Kisan Samman Nidhi"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Unique Scheme Code *</label>
                    <input
                      type="text"
                      required
                      disabled={isEditing}
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="input-field text-xs uppercase"
                      placeholder="e.g. PM-KISAN"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ministry *</label>
                    <input
                      type="text"
                      required
                      value={formData.ministry}
                      onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                      className="input-field text-xs"
                      placeholder="Ministry of Agriculture"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category / Sector *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field text-xs"
                    >
                      <option value="Agriculture & Rural">Agriculture & Rural</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Education & Skill">Education & Skill</option>
                      <option value="Housing & Shelter">Housing & Shelter</option>
                      <option value="Financial Inclusion & Business">Financial Inclusion & Business</option>
                      <option value="Social Welfare & Women">Social Welfare & Women</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Financial Aid Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.financialAidAmount}
                      onChange={(e) => setFormData({ ...formData, financialAidAmount: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="input-field text-xs"
                    >
                      <option value="Central">Central</option>
                      <option value="State">State</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Applicable State</label>
                    <input
                      type="text"
                      value={formData.applicableState}
                      onChange={(e) => setFormData({ ...formData, applicableState: e.target.value })}
                      className="input-field text-xs"
                      placeholder="All India or Karnataka"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brief Description</label>
                  <textarea
                    rows={2}
                    value={formData.briefDescription}
                    onChange={(e) => setFormData({ ...formData, briefDescription: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Benefits Details</label>
                  <textarea
                    rows={2}
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              {/* Eligibility Rules */}
              <div className="space-y-4 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider">2. Eligibility Engine Rules</h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Min Age (blank for none)</label>
                    <input
                      type="number"
                      value={formData.minAge}
                      onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Max Age (blank for none)</label>
                    <input
                      type="number"
                      value={formData.maxAge}
                      onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eligible Gender</label>
                    <select
                      value={formData.eligibleGenders}
                      onChange={(e) => setFormData({ ...formData, eligibleGenders: e.target.value })}
                      className="input-field text-xs"
                    >
                      <option value="All">All Genders</option>
                      <option value="Male">Male Only</option>
                      <option value="Female">Female Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Max Annual Family Income (₹)</label>
                    <input
                      type="number"
                      value={formData.maxAnnualIncome}
                      onChange={(e) => setFormData({ ...formData, maxAnnualIncome: e.target.value })}
                      className="input-field text-xs"
                      placeholder="e.g. 250000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eligible Categories</label>
                    <input
                      type="text"
                      value={formData.eligibleCategories}
                      onChange={(e) => setFormData({ ...formData, eligibleCategories: e.target.value })}
                      className="input-field text-xs"
                      placeholder="All or 'SC,ST,OBC'"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eligible Occupations</label>
                    <input
                      type="text"
                      value={formData.eligibleOccupations}
                      onChange={(e) => setFormData({ ...formData, eligibleOccupations: e.target.value })}
                      className="input-field text-xs"
                      placeholder="All or 'Farmer,Student'"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eligible Educations</label>
                    <input
                      type="text"
                      value={formData.eligibleEducations}
                      onChange={(e) => setFormData({ ...formData, eligibleEducations: e.target.value })}
                      className="input-field text-xs"
                      placeholder="All or '12th Pass,Graduate'"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.requiresLand}
                      onChange={(e) => setFormData({ ...formData, requiresLand: e.target.checked })}
                      className="rounded"
                    />
                    Requires Land
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.requiresBpl}
                      onChange={(e) => setFormData({ ...formData, requiresBpl: e.target.checked })}
                      className="rounded"
                    />
                    Requires BPL Card
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.requiresDisability}
                      onChange={(e) => setFormData({ ...formData, requiresDisability: e.target.checked })}
                      className="rounded"
                    />
                    Requires Disability (PwD)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.ruralOnly}
                      onChange={(e) => setFormData({ ...formData, ruralOnly: e.target.checked })}
                      className="rounded"
                    />
                    Rural Only
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded"
                    />
                    Scheme Active
                  </label>
                </div>
              </div>

              {/* Documents & Procedure */}
              <div className="space-y-4 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider">3. Documents & Application Procedure</h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Required Documents (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requiredDocuments}
                    onChange={(e) => setFormData({ ...formData, requiredDocuments: e.target.value })}
                    className="input-field text-xs font-mono"
                    placeholder="1. Aadhaar Card&#10;2. Bank Passbook&#10;3. Land Records"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Application Procedure Steps (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.applicationProcedure}
                    onChange={(e) => setFormData({ ...formData, applicationProcedure: e.target.value })}
                    className="input-field text-xs font-mono"
                    placeholder="1. Visit portal&#10;2. Complete KYC registration&#10;3. Submit documents"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Portal URL</label>
                    <input
                      type="url"
                      value={formData.officialWebsite}
                      onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
                      className="input-field text-xs"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Helpline Phone Number</label>
                    <input
                      type="text"
                      value={formData.helplineNumber}
                      onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                      className="input-field text-xs"
                      placeholder="1800-111-565"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingScheme}
                  className="btn-primary text-xs py-2 px-6 font-bold"
                >
                  {savingScheme ? 'Saving...' : isEditing ? 'Update Scheme' : 'Create Scheme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
