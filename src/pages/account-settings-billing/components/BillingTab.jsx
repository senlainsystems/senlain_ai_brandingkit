import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BillingTab = () => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(true);

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ];

  const invoiceHistory = [
    {
      id: 'INV-2024-001',
      date: '2024-02-15',
      amount: 29.00,
      status: 'paid',
      plan: 'Pro Plan',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-15',
      amount: 29.00,
      status: 'paid',
      plan: 'Pro Plan',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 29.00,
      status: 'paid',
      plan: 'Pro Plan',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 0.00,
      status: 'paid',
      plan: 'Hobby Plan',
      downloadUrl: '#'
    }
  ];

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-success bg-success-50 border-success-200';
      case 'pending':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'failed':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-muted bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Payment Methods</h3>
          <button
            onClick={() => setShowAddCardModal(true)}
            className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span>Add Card</span>
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 transition-colors duration-200 ${
                method.isDefault ? 'border-primary bg-primary-50' : 'border-border bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    method.isDefault ? 'bg-primary' : 'bg-gray-100'
                  }`}>
                    <Icon 
                      name={getCardIcon(method.brand)} 
                      size={20} 
                      color={method.isDefault ? 'white' : 'gray'} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">
                        {method.brand} •••• {method.last4}
                      </span>
                      {method.isDefault && (
                        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">
                      Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                      Set as Default
                    </button>
                  )}
                  <button className="text-sm text-error hover:text-error-600 transition-colors duration-200">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Billing Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h4 className="font-medium text-text-primary">Auto-renewal</h4>
              <p className="text-sm text-text-secondary">
                Automatically renew your subscription each billing cycle
              </p>
            </div>
            <button
              onClick={() => setAutoRenewal(!autoRenewal)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                autoRenewal ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  autoRenewal ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">Billing Address</h4>
                <p className="text-sm text-text-secondary mt-1">
                  123 Business Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
              <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                Update
              </button>
            </div>
          </div>

          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">Tax Information</h4>
                <p className="text-sm text-text-secondary">
                  VAT ID: Not provided
                </p>
              </div>
              <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                Add VAT ID
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Invoice History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Date</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceHistory.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-b-0">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-text-primary">{invoice.id}</span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{invoice.plan}</td>
                  <td className="py-3 px-4 font-medium text-text-primary">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1">
                      <Icon name="Download" size={14} />
                      <span className="text-sm">Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Add Payment Method</h3>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="input-field w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input-field w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="setDefault" className="rounded" />
                <label htmlFor="setDefault" className="text-sm text-text-secondary">
                  Set as default payment method
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary px-4 py-2 rounded-lg"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingTab;