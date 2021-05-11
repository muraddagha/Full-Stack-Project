using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DataService.Data.Entities;
using DataService.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataService.Infrastructure.Exceptions;

namespace DataService.Services.ContentServices
{
    public interface ISettingService
    {
        Task<IEnumerable<Setting>> GetSettingsAll();
        Task<Setting> GetSetting();
        Task<Setting> GetSettingById(int id);
        Task<Setting> CreateSetting(Setting setting);
        Task UpdateSetting(int id, Setting setting);
        Task RemoveSetting(int id);
        Task<IEnumerable<SocialLinks>> GetSocialLinksAll();
        Task<IEnumerable<SocialLinks>> GetsocialLinks();
        Task<SocialLinks> GetSocialLinkById(int id);
        Task<SocialLinks> CreateSocialLink(SocialLinks socialLink);
        Task UpdateSocialLink(int id, SocialLinks socialLink);
        Task RemoveSocialLink(int id);
        void RemoveLogo(int id);
    }
    public class SettingService : ISettingService
    {
        private readonly AppDbContext _context;

        public SettingService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Setting> CreateSetting(Setting setting)
        {
            setting.AddedDate = DateTime.Now;
            await _context.Settings.AddAsync(setting);
            await _context.SaveChangesAsync();
            return setting;

        }

        public async Task<SocialLinks> CreateSocialLink(SocialLinks socialLink)
        {
            socialLink.AddedDate = DateTime.Now;
            await _context.SocialLinks.AddAsync(socialLink);
            await _context.SaveChangesAsync();
            return socialLink;
        }

        public async Task<Setting> GetSetting()
        {
            return await _context.Settings.Where(s => !s.SoftDeleted).FirstOrDefaultAsync();
        }

        public async Task<Setting> GetSettingById(int id)
        {
            var setting = await _context.Settings.FindAsync(id);
            if (setting == null) throw new HttpException(404, "Parametr tapılmadı");
            return setting;
        }

        public async Task<IEnumerable<Setting>> GetSettingsAll()
        {
            return await _context.Settings.ToListAsync();
        }

        public async Task<SocialLinks> GetSocialLinkById(int id)
        {
            var socialLink = await _context.SocialLinks.FindAsync(id);
            if (socialLink == null) throw new HttpException(404, "Sosial link tapılmadı");
            return socialLink;
        }

        public async Task<IEnumerable<SocialLinks>> GetsocialLinks()
        {
            return await _context.SocialLinks.Where(s => !s.SoftDeleted).ToListAsync();
        }

        public async Task<IEnumerable<SocialLinks>> GetSocialLinksAll()
        {
            return await _context.SocialLinks.ToListAsync();
        }

        public void RemoveLogo(int id)
        {
            var setting = _context.Settings.Find(id);
            setting.Logo = null;
            setting.FileName = null;
            _context.SaveChanges();
        }

        public async Task RemoveSetting(int id)
        {
            var setting = await GetSettingById(id);
            setting.SoftDeleted = true;
            setting.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }

        public async Task RemoveSocialLink(int id)
        {
            var socialLink = await GetSocialLinkById(id);
            socialLink.SoftDeleted = true;
            socialLink.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSetting(int id, Setting setting)
        {
            var updateSetting = await GetSettingById(id);
            updateSetting.Logo = setting.Logo;
            updateSetting.Adress = setting.Adress;
            updateSetting.Email = setting.Email;
            updateSetting.Phone = setting.Phone;
            updateSetting.FileName = setting.FileName;
            updateSetting.SoftDeleted = setting.SoftDeleted;
            updateSetting.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSocialLink(int id, SocialLinks socialLink)
        {
            var updateSocialLink = await GetSocialLinkById(id);
            updateSocialLink.Name = socialLink.Name;
            updateSocialLink.Icon = socialLink.Icon;
            updateSocialLink.Endpoint = socialLink.Endpoint;
            updateSocialLink.SoftDeleted = socialLink.SoftDeleted;
            updateSocialLink.ModifiedDate = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
