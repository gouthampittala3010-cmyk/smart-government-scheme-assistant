import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { 
  UserCheck, 
  Save, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Home, 
  Loader2 
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

const OCCUPATIONS = [
  'Farmer',
  'Student',
  'Daily Wage / Laborer',
  'Self Employed / Entrepreneur',
  'Artisan / Weaver',
  'Unemployed',
  'Private Sector Employee',
  'Government Employee',
  'Senior Citizen / Retired',
  'Homemaker'
];

const EDUCATION_LEVELS = [
  'Illiterate / No Formal Education',
  'Below 10th',
  '10th Pass',
  '12th Pass',
  'Diploma / ITI',
  'Graduate',
  'Post Graduate',
  'Doctorate'
];

const CitizenProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: 28,
    gender: 'Male',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    annualIncome: 180000,
    occupation: 'Farmer',
    category: 'OBC',
    education: '10th Pass',
    maritalStatus: 'Married',
    disability: false,
    disabilityPercentage: 0,
    minority: false,
    ruralUrban: 'Rural',
    bplCardHolder: true,
    hasLand: true,
    landHoldingHectares: 1.5,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await profileApi.getProfile();
        if (res.data) {
          setFormData({
            ...res.data,
            age: res.data.age ?? 28,
            annualIncome: res.data.annualIncome ?? 180000,
            disability: res.data.disability ?? false,
            disabilityPercentage: res.data.disabilityPercentage ?? 0,
            minority: res.data.minority ?? false,
            bplCardHolder: res.data.bplCardHolder ?? false,
            hasLand: res.data.hasLand ?? false,
            landHoldingHectares: res.data.landHoldingHectares ?? 0,
          });
        }
      } catch (err) {
        // If 404, user doesn't have a profile yet - use defaults
        console.log('No existing profile yet, ready for creation.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async (andCheckEligibility = false) => {
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age, 10),
        annualIncome: parseFloat(formData.annualIncome),
        disabilityPercentage: formData.disability ? parseInt(formData.disabilityPercentage, 10) : 0,
        landHoldingHectares: formData.hasLand ? parseFloat(formData.landHoldingHectares) : 0.0,
      };

      await profileApi.saveProfile(payload);
      await refreshUser();
      setSuccessMsg('Citizen Profile saved successfully!');

      if (andCheckEligibility) {
        navigate('/eligibility');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile. Please verify your details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm text-slate-500">Loading citizen profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Citizen Demographic & Socioeconomic Profile</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Personal & Financial Information</h1>
          <p className="text-sm text-slate-600 mt-1">
            These attributes are used by our AI eligibility engine to match Central and State government schemes.
          </p>
        </div>

        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="btn-primary py-2.5 px-5 text-sm flex items-center justify-center gap-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Save & Check Eligibility</span>
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <div className="space-y-6">
        {/* Section 1: Demographics */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Users className="w-5 h-5 text-indigo-600" />
            1. Personal Demographics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Age (Years) *
              </label>
              <input
                type="number"
                name="age"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Single">Single / Unmarried</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced / Separated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                State / Union Territory *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="input-field"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                District / City
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Bengaluru Rural"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Financial & Employment */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
            2. Financial & Occupation Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Annual Family Income (₹) *
              </label>
              <input
                type="number"
                name="annualIncome"
                min="0"
                step="5000"
                value={formData.annualIncome}
                onChange={handleChange}
                className="input-field"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">₹{Number(formData.annualIncome || 0).toLocaleString('en-IN')}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Occupation *
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="input-field"
              >
                {OCCUPATIONS.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Highest Education *
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="input-field"
              >
                {EDUCATION_LEVELS.map((edu) => (
                  <option key={edu} value={edu}>{edu}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Social & Welfare Category */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            3. Social Category & Affirmative Criteria
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Social Category / Caste *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Area Classification *
              </label>
              <select
                name="ruralUrban"
                value={formData.ruralUrban}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Rural">Rural Area</option>
                <option value="Urban">Urban Area</option>
                <option value="Semi-Urban">Semi-Urban</option>
              </select>
            </div>
          </div>

          {/* Checkboxes: Minority, Disability, BPL, Land */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                name="minority"
                checked={formData.minority}
                onChange={handleChange}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">Minority Community</p>
                <p className="text-[11px] text-slate-500">Muslim, Christian, Sikh, Buddhist, Jain, Parsi</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                name="bplCardHolder"
                checked={formData.bplCardHolder}
                onChange={handleChange}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">BPL / Antyodaya Ration Card</p>
                <p className="text-[11px] text-slate-500">Hold active Below Poverty Line family ration card</p>
              </div>
            </label>
          </div>

          {/* Disability & Land sub-sections */}
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="disability"
                  checked={formData.disability}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-800">Person with Benchmark Disability (PwD)</span>
              </label>

              {formData.disability && (
                <div className="pl-7">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Disability Percentage (%): {formData.disabilityPercentage}%
                  </label>
                  <input
                    type="range"
                    name="disabilityPercentage"
                    min="40"
                    max="100"
                    value={formData.disabilityPercentage}
                    onChange={handleChange}
                    className="w-full max-w-xs"
                  />
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasLand"
                  checked={formData.hasLand}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-800">Owns Cultivable Agricultural Land</span>
              </label>

              {formData.hasLand && (
                <div className="pl-7 max-w-xs">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Land Holding in Hectares:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="landHoldingHectares"
                    value={formData.landHoldingHectares}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="btn-secondary py-3 px-6 text-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn-primary py-3 px-6 text-sm flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Save & Check Scheme Eligibility</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfilePage;
